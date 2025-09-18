<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Cookie;

class TymonAuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'refresh']]);
    }

    /**
     * تسجيل الدخول - Platform-agnostic (Web & Mobile)
     */
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
            'platform' => 'in:web,mobile,desktop'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $credentials = $request->only('email', 'password');

        try {
            // محاولة تسجيل الدخول والحصول على token
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'message' => 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
                ], 401);
            }
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Could not create token'
            ], 500);
        }

        $user = auth()->user();

        // التحقق من أن الحساب نشط
        if (!$user->is_active) {
            JWTAuth::invalidate($token);
            return response()->json([
                'success' => false,
                'message' => 'الحساب غير مفعل'
            ], 403);
        }

        // تحديث معلومات آخر تسجيل دخول
        $user->update([
            'last_login_at' => now(),
            'last_login_ip' => $request->ip(),
            'last_login_platform' => $request->input('platform', 'web')
        ]);

        // Platform detection
        $platform = $request->input('platform', 'web');

        if ($platform === 'web') {
            // للويب: إرجاع token في HttpOnly Cookie
            $ttl = config('jwt.ttl', 60); // بالدقائق
            $refreshTtl = config('jwt.refresh_ttl', 20160); // بالدقائق

            return $this->respondWithTokenAndCookies($token, $user);
        }

        // للموبايل: إرجاع token في Response
        return $this->respondWithToken($token, $user);
    }

    /**
     * تسجيل مستخدم جديد
     */
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'user_type' => 'required|in:freelancer,employer',
            'phone' => 'nullable|string|max:20',
            'platform' => 'in:web,mobile,desktop'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        // إنشاء المستخدم
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => $request->user_type,
            'phone' => $request->phone,
            'is_active' => true
        ]);

        // تعيين الدور (Spatie Permissions)
        if ($request->user_type === 'freelancer') {
            $user->assignRole('freelancer');
        } elseif ($request->user_type === 'employer') {
            $user->assignRole('employer');
        }

        // إنشاء token
        $token = JWTAuth::fromUser($user);

        $platform = $request->input('platform', 'web');

        if ($platform === 'web') {
            return $this->respondWithTokenAndCookies($token, $user);
        }

        return $this->respondWithToken($token, $user);
    }

    /**
     * الحصول على المستخدم المسجل حالياً
     */
    public function me(): JsonResponse
    {
        $user = auth()->user();
        $user->load('roles', 'permissions');

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'user_type' => $user->user_type,
                'avatar' => $user->avatar_url,
                'phone' => $user->phone,
                'bio' => $user->bio,
                'skills' => $user->skills,
                'hourly_rate' => $user->hourly_rate,
                'rating' => $user->rating,
                'is_verified' => $user->email_verified_at !== null,
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
                'created_at' => $user->created_at,
                'last_login_at' => $user->last_login_at
            ]
        ]);
    }

    /**
     * تسجيل الخروج
     */
    public function logout(): JsonResponse
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
        } catch (JWTException $e) {
            // Token already invalid or blacklisted
        }

        return response()->json([
            'success' => true,
            'message' => 'تم تسجيل الخروج بنجاح'
        ])
        ->cookie(Cookie::forget('jwt_token'))
        ->cookie(Cookie::forget('jwt_refresh_token'));
    }

    /**
     * تجديد Token
     */
    public function refresh(Request $request): JsonResponse
    {
        try {
            $platform = $request->input('platform', 'web');

            // للويب: محاولة من Cookie
            if ($platform === 'web') {
                $token = $request->cookie('jwt_token');
                if ($token) {
                    JWTAuth::setToken($token);
                }
            }

            // تجديد Token
            $newToken = JWTAuth::refresh();
            $user = JWTAuth::setToken($newToken)->authenticate();

            if ($platform === 'web') {
                return $this->respondWithTokenAndCookies($newToken, $user);
            }

            return $this->respondWithToken($newToken, $user);

        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Could not refresh token'
            ], 401);
        }
    }

    /**
     * التحقق من صحة Token
     */
    public function check(): JsonResponse
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            return response()->json([
                'success' => true,
                'authenticated' => true,
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'user_type' => $user->user_type,
                    'roles' => $user->getRoleNames()
                ]
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'authenticated' => false,
                'message' => 'Token invalid or expired'
            ], 401);
        }
    }

    /**
     * Get the token array structure (للموبايل)
     */
    protected function respondWithToken($token, $user = null): JsonResponse
    {
        if (!$user) {
            $user = auth()->user();
        }

        return response()->json([
            'success' => true,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'user_type' => $user->user_type,
                'avatar' => $user->avatar_url,
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name')
            ]
        ]);
    }

    /**
     * Get the token array structure with cookies (للويب)
     */
    protected function respondWithTokenAndCookies($token, $user = null): JsonResponse
    {
        if (!$user) {
            $user = auth()->user();
        }

        $ttl = JWTAuth::factory()->getTTL(); // بالدقائق

        return response()->json([
            'success' => true,
            'message' => 'تم تسجيل الدخول بنجاح',
            'user' => [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'user_type' => $user->user_type,
                'avatar' => $user->avatar_url,
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name')
            ]
        ])
        ->cookie(
            'jwt_token',
            $token,
            $ttl, // مدة الصلاحية بالدقائق
            '/', // path
            null, // domain
            true, // secure (HTTPS only in production)
            true, // httpOnly
            false, // raw
            'Strict' // sameSite
        );
    }
}
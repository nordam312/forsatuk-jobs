<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

class JWTAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = null;

        // 1. Try to get token from Authorization header (للموبايل)
        if ($request->hasHeader('Authorization')) {
            $authHeader = $request->header('Authorization');
            if (preg_match('/Bearer\s+(\S+)/', $authHeader, $matches)) {
                $token = $matches[1];
            }
        }

        // 2. Try to get token from cookie (للويب)
        if (!$token && $request->hasCookie('jwt_token')) {
            $token = $request->cookie('jwt_token');
        }

        // 3. Try to get token from query parameter (للتحميلات)
        if (!$token && $request->has('token')) {
            $token = $request->query('token');
        }

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized - Token not provided',
                'error' => 'UNAUTHORIZED'
            ], 401);
        }

        try {
            // Set the token for JWTAuth
            JWTAuth::setToken($token);

            // Authenticate and get the user
            $user = JWTAuth::authenticate();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found',
                    'error' => 'USER_NOT_FOUND'
                ], 404);
            }

            // Check if user is active
            if (!$user->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'الحساب غير مفعل',
                    'error' => 'ACCOUNT_DEACTIVATED'
                ], 403);
            }

            // Set the authenticated user for the request
            auth()->setUser($user);
            $request->merge(['user' => $user]);
            $request->setUserResolver(function () use ($user) {
                return $user;
            });

            // Update last activity
            $user->update(['last_activity_at' => now()]);

        } catch (TokenExpiredException $e) {
            // محاولة تجديد التوكن تلقائياً
            try {
                $newToken = JWTAuth::refresh();
                $user = JWTAuth::setToken($newToken)->authenticate();

                // Set new token in response header
                $response = $next($request);
                $response->headers->set('Authorization', 'Bearer ' . $newToken);

                // For web, update cookie
                if ($request->hasCookie('jwt_token')) {
                    $ttl = config('jwt.ttl', 60);
                    $response->withCookie(cookie(
                        'jwt_token',
                        $newToken,
                        $ttl,
                        '/',
                        null,
                        false, // secure - false for local development
                        true,  // httpOnly
                        false, // raw
                        'Lax'  // sameSite - Lax for cross-origin
                    ));
                }

                return $response;

            } catch (JWTException $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Token has expired and cannot be refreshed',
                    'error' => 'TOKEN_EXPIRED'
                ], 401);
            }
        } catch (TokenInvalidException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid token',
                'error' => 'INVALID_TOKEN'
            ], 401);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token error: ' . $e->getMessage(),
                'error' => 'TOKEN_ERROR'
            ], 401);
        }

        return $next($request);
    }
}
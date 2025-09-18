<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\TymonAuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Platform-agnostic API Routes - تعمل مع Web و Mobile
*/

// ============================================
// Public Routes (بدون مصادقة)
// ============================================

Route::prefix('auth')->group(function () {
    // تسجيل الدخول - Web & Mobile
    Route::post('/login', [TymonAuthController::class, 'login']);

    // تسجيل مستخدم جديد
    Route::post('/register', [TymonAuthController::class, 'register']);

    // تجديد Token
    Route::post('/refresh', [TymonAuthController::class, 'refresh']);

    // التحقق من حالة المصادقة
    Route::get('/check', [TymonAuthController::class, 'check']);
});

// معلومات عامة عن API
Route::get('/', function () {
    return response()->json([
        'name' => 'Forsatuk API',
        'version' => '1.0.0',
        'status' => 'active',
        'documentation' => url('/api/docs'),
        'endpoints' => [
            'auth' => url('/api/auth'),
            'users' => url('/api/users'),
            'jobs' => url('/api/jobs'),
            'proposals' => url('/api/proposals')
        ]
    ]);
});

// ============================================
// Protected Routes (تحتاج مصادقة)
// ============================================

Route::middleware(['jwt.auth'])->group(function () {

    // Auth endpoints
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [TymonAuthController::class, 'logout']);
        Route::get('/me', [TymonAuthController::class, 'me']);
    });

    // User Profile
    Route::prefix('profile')->group(function () {
        Route::get('/', function (Request $request) {
            return response()->json([
                'success' => true,
                'user' => $request->user()
            ]);
        });

        Route::put('/', function (Request $request) {
            // Update profile logic
            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully'
            ]);
        });

        Route::post('/avatar', function (Request $request) {
            // Upload avatar logic
            return response()->json([
                'success' => true,
                'message' => 'Avatar uploaded successfully'
            ]);
        });
    });

    // Jobs (المشاريع)
    Route::prefix('jobs')->group(function () {
        Route::get('/', function () {
            return response()->json([
                'success' => true,
                'data' => [],
                'message' => 'Jobs endpoint'
            ]);
        })->middleware('permission:view jobs');

        Route::post('/', function (Request $request) {
            // Create job (للـ employers فقط)
            return response()->json([
                'success' => true,
                'message' => 'Job created successfully'
            ]);
        })->middleware('permission:create jobs');

        Route::put('/{id}', function ($id) {
            return response()->json([
                'success' => true,
                'message' => 'Job updated successfully'
            ]);
        })->middleware('permission:edit jobs');

        Route::delete('/{id}', function ($id) {
            return response()->json([
                'success' => true,
                'message' => 'Job deleted successfully'
            ]);
        })->middleware('permission:delete jobs');
    });

    // Proposals (العروض)
    Route::prefix('proposals')->group(function () {
        Route::get('/', function () {
            return response()->json([
                'success' => true,
                'data' => [],
                'message' => 'Proposals endpoint'
            ]);
        })->middleware('permission:view proposals');

        Route::post('/', function (Request $request) {
            // Submit proposal (للـ freelancers فقط)
            return response()->json([
                'success' => true,
                'message' => 'Proposal submitted successfully'
            ]);
        })->middleware('permission:create proposals');

        Route::put('/{id}/accept', function ($id) {
            return response()->json([
                'success' => true,
                'message' => 'Proposal accepted'
            ]);
        })->middleware('permission:accept proposals');

        Route::put('/{id}/reject', function ($id) {
            return response()->json([
                'success' => true,
                'message' => 'Proposal rejected'
            ]);
        })->middleware('permission:reject proposals');
    });

    // Messages
    Route::prefix('messages')->group(function () {
        Route::get('/', function () {
            return response()->json([
                'success' => true,
                'data' => [],
                'message' => 'Messages endpoint'
            ]);
        });
    });

    // Admin Routes
    Route::prefix('admin')->middleware('role:admin|moderator')->group(function () {
        Route::get('/stats', function () {
            return response()->json([
                'success' => true,
                'data' => [
                    'total_users' => \App\Models\User::count(),
                    'total_jobs' => 0,
                    'total_proposals' => 0,
                    'revenue_today' => 0
                ]
            ]);
        })->middleware('permission:view statistics');

        Route::get('/users', function () {
            return response()->json([
                'success' => true,
                'data' => \App\Models\User::with('roles')->paginate(10)
            ]);
        })->middleware('permission:view users');

        Route::put('/users/{id}/ban', function ($id) {
            return response()->json([
                'success' => true,
                'message' => 'User banned successfully'
            ]);
        })->middleware('permission:ban users');

        Route::put('/users/{id}/verify', function ($id) {
            return response()->json([
                'success' => true,
                'message' => 'User verified successfully'
            ]);
        })->middleware('permission:verify users');
    });
});

// ============================================
// Public Endpoints (معلومات عامة)
// ============================================

// قائمة الفئات
Route::get('/categories', function () {
    return response()->json([
        'success' => true,
        'data' => [
            ['id' => 1, 'name' => 'Programming', 'name_ar' => 'البرمجة'],
            ['id' => 2, 'name' => 'Design', 'name_ar' => 'التصميم'],
            ['id' => 3, 'name' => 'Writing', 'name_ar' => 'الكتابة'],
            ['id' => 4, 'name' => 'Marketing', 'name_ar' => 'التسويق'],
            ['id' => 5, 'name' => 'Translation', 'name_ar' => 'الترجمة']
        ]
    ]);
});

// قائمة المهارات
Route::get('/skills', function () {
    return response()->json([
        'success' => true,
        'data' => [
            'JavaScript', 'Python', 'React', 'Laravel', 'Node.js',
            'PHP', 'WordPress', 'Photoshop', 'Illustrator', 'SEO'
        ]
    ]);
});

// ============================================
// Error Handling
// ============================================

// 404 for undefined API routes
Route::fallback(function () {
    return response()->json([
        'success' => false,
        'message' => 'Endpoint not found',
        'error' => 'NOT_FOUND'
    ], 404);
});
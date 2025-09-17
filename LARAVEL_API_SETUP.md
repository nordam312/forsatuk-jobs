# إعداد Laravel API لمنصة فرصتك

## 📋 المتطلبات الأساسية

### تثبيت PHP و Composer
```bash
# Windows - استخدم XAMPP أو Laragon
# Laragon موصى به لسهولة الاستخدام
https://laragon.org/download/

# أو تثبيت PHP منفصل
https://windows.php.net/download/
```

## 🚀 إنشاء مشروع Laravel API

### 1. إنشاء المشروع
```bash
# في مجلد forsatuk-jobs
composer create-project laravel/laravel backend
cd backend

# أو استخدام Laravel installer
laravel new backend --api
```

### 2. تثبيت الحزم المطلوبة
```bash
# JWT للمصادقة
composer require tymon/jwt-auth

# CORS للسماح بالطلبات من React
composer require fruitcake/laravel-cors

# Spatie للصلاحيات
composer require spatie/laravel-permission

# Media Library للملفات
composer require spatie/laravel-medialibrary

# Sluggable للروابط
composer require spatie/laravel-sluggable

# Activity Log
composer require spatie/laravel-activitylog

# Payment Gateways (اختياري)
composer require srmklive/paypal
composer require stripe/stripe-php
```

### 3. إعداد قاعدة البيانات (.env)
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=forsatuk_jobs
DB_USERNAME=root
DB_PASSWORD=

# إعدادات JWT
JWT_SECRET=your-secret-key-here
JWT_TTL=60
JWT_REFRESH_TTL=20160

# إعدادات CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# إعدادات اللغة
APP_LOCALE=ar
APP_FALLBACK_LOCALE=en
```

### 4. نشر إعدادات الحزم
```bash
# JWT
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret

# CORS
php artisan vendor:publish --tag="cors"

# Spatie Permissions
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"

# Media Library
php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="migrations"
```

## 📁 هيكل المشروع

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/
│   │   │   │   ├── Auth/
│   │   │   │   │   ├── LoginController.php
│   │   │   │   │   ├── RegisterController.php
│   │   │   │   │   └── ForgotPasswordController.php
│   │   │   │   ├── JobController.php
│   │   │   │   ├── ProposalController.php
│   │   │   │   ├── UserController.php
│   │   │   │   ├── MessageController.php
│   │   │   │   ├── PaymentController.php
│   │   │   │   └── CategoryController.php
│   │   ├── Middleware/
│   │   │   ├── SetLocale.php
│   │   │   └── CheckUserType.php
│   │   └── Requests/
│   │       ├── JobRequest.php
│   │       └── ProposalRequest.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── Job.php
│   │   ├── Proposal.php
│   │   ├── Category.php
│   │   ├── Message.php
│   │   ├── Transaction.php
│   │   └── Wallet.php
│   └── Services/
│       ├── PaymentService.php
│       └── NotificationService.php
├── database/
│   ├── migrations/
│   └── seeders/
├── routes/
│   └── api.php
└── resources/
    └── lang/
        ├── ar/
        └── en/
```

## 🔧 إعداد Routes (routes/api.php)

```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\ProposalController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\CategoryController;

// Public Routes
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLink']);

// Categories & Jobs (Public)
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/jobs', [JobController::class, 'index']);
Route::get('/jobs/{job}', [JobController::class, 'show']);
Route::get('/freelancers', [UserController::class, 'freelancers']);

// Protected Routes
Route::middleware(['auth:api'])->group(function () {
    // Profile
    Route::get('/profile', [UserController::class, 'profile']);
    Route::put('/profile', [UserController::class, 'updateProfile']);

    // Jobs (Employer)
    Route::middleware(['user.type:employer'])->group(function () {
        Route::post('/jobs', [JobController::class, 'store']);
        Route::put('/jobs/{job}', [JobController::class, 'update']);
        Route::delete('/jobs/{job}', [JobController::class, 'destroy']);
    });

    // Proposals (Freelancer)
    Route::middleware(['user.type:freelancer'])->group(function () {
        Route::post('/proposals', [ProposalController::class, 'store']);
        Route::get('/my-proposals', [ProposalController::class, 'myProposals']);
    });

    // Messages
    Route::get('/messages', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);

    // Payments
    Route::get('/wallet', [PaymentController::class, 'wallet']);
    Route::post('/deposit', [PaymentController::class, 'deposit']);
    Route::post('/withdraw', [PaymentController::class, 'withdraw']);
});
```

## 🎨 نماذج Eloquent Models

### User Model
```php
<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Spatie\Permission\Traits\HasRoles;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class User extends Authenticatable implements JWTSubject, HasMedia
{
    use HasRoles, InteractsWithMedia;

    protected $fillable = [
        'name',
        'email',
        'password',
        'user_type', // freelancer, employer
        'phone',
        'bio',
        'hourly_rate',
        'skills',
        'languages',
        'is_verified',
    ];

    protected $casts = [
        'skills' => 'array',
        'languages' => 'array',
        'is_verified' => 'boolean',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function jobs()
    {
        return $this->hasMany(Job::class, 'employer_id');
    }

    public function proposals()
    {
        return $this->hasMany(Proposal::class, 'freelancer_id');
    }

    public function wallet()
    {
        return $this->hasOne(Wallet::class);
    }
}
```

### Job Model
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Job extends Model
{
    use HasSlug;

    protected $fillable = [
        'employer_id',
        'title',
        'slug',
        'description',
        'category_id',
        'skills_required',
        'budget_type',
        'budget_min',
        'budget_max',
        'duration',
        'experience_level',
        'status',
        'is_featured',
    ];

    protected $casts = [
        'skills_required' => 'array',
        'is_featured' => 'boolean',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function employer()
    {
        return $this->belongsTo(User::class, 'employer_id');
    }

    public function proposals()
    {
        return $this->hasMany(Proposal::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
```

## 🌐 دعم اللغات في Laravel

### Middleware للغة (app/Http/Middleware/SetLocale.php)
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        $locale = $request->header('Accept-Language', 'ar');

        if (in_array($locale, ['ar', 'en'])) {
            app()->setLocale($locale);
        }

        return $next($request);
    }
}
```

### ملفات الترجمة (resources/lang/ar/messages.php)
```php
<?php

return [
    'welcome' => 'مرحباً بك في فرصتك',
    'job_created' => 'تم إنشاء الوظيفة بنجاح',
    'proposal_sent' => 'تم إرسال عرضك بنجاح',
    'insufficient_balance' => 'الرصيد غير كافي',
    'payment_success' => 'تمت العملية بنجاح',
    'unauthorized' => 'غير مصرح لك بهذا الإجراء',
];
```

## 🔐 Controllers الأساسية

### LoginController
```php
<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'message' => __('messages.invalid_credentials')
            ], 401);
        }

        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
}
```

### JobController
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $jobs = Job::with(['employer', 'category'])
            ->when($request->category, function ($query, $category) {
                $query->where('category_id', $category);
            })
            ->when($request->min_budget, function ($query, $min) {
                $query->where('budget_min', '>=', $min);
            })
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
            })
            ->where('status', 'open')
            ->paginate(20);

        return response()->json($jobs);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'skills_required' => 'required|array',
            'budget_type' => 'required|in:fixed,hourly',
            'budget_min' => 'required|numeric|min:0',
            'budget_max' => 'required|numeric|gt:budget_min',
            'duration' => 'required|string',
            'experience_level' => 'required|in:entry,intermediate,expert',
        ]);

        $job = auth()->user()->jobs()->create($validated);

        return response()->json([
            'message' => __('messages.job_created'),
            'job' => $job
        ], 201);
    }
}
```

## 🚀 أوامر التشغيل

```bash
# إنشاء قاعدة البيانات
php artisan migrate

# تشغيل Seeders
php artisan db:seed

# تشغيل الخادم
php artisan serve --port=8000

# في نافذة أخرى - تشغيل Queue (للإشعارات)
php artisan queue:work
```

## 🔗 ربط Frontend مع Backend

### إعداد Axios في React
```javascript
// src/lib/axios.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': localStorage.getItem('language') || 'ar',
  },
});

// Add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
```

## 📝 ملاحظات مهمة

1. **الأمان**: استخدم HTTPS في الإنتاج
2. **CORS**: تأكد من إعداد CORS بشكل صحيح
3. **التحقق**: استخدم Form Requests للتحقق
4. **الكاش**: استخدم Redis للكاش
5. **الصور**: استخدم Cloudinary أو S3

## 🎯 الخطوات التالية

1. تثبيت Laragon أو XAMPP
2. إنشاء مشروع Laravel
3. تثبيت الحزم المطلوبة
4. إنشاء قاعدة البيانات
5. إنشاء Models و Controllers
6. ربط مع React
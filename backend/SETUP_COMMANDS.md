# 🚀 Laravel JWT Setup Commands

## 1. تثبيت الحزم المطلوبة
```bash
# JWT Package
composer require firebase/php-jwt

# CORS Support
composer require fruitcake/laravel-cors

# User Agent Detection (للإحصائيات)
composer require jenssegers/agent

# API Resources
composer require laravel/sanctum
```

## 2. إنشاء الـ Migrations
```bash
# إضافة حقول للمستخدمين
php artisan make:migration add_jwt_fields_to_users_table

# جدول الإحصائيات
php artisan make:migration create_visitor_stats_table

# جدول النشاطات
php artisan make:migration create_user_activities_table
```

## 3. إنشاء الـ Controllers
```bash
php artisan make:controller Api/Auth/AuthController
php artisan make:controller Api/Auth/RegisterController
php artisan make:controller Api/UserController --api
```

## 4. إنشاء الـ Middleware
```bash
php artisan make:middleware JWTAuthenticate
php artisan make:middleware TrackVisitor
```

## 5. إنشاء الـ Services
```bash
mkdir app/Services
# سنقوم بإنشاء JWTService.php يدوياً
```

## 6. تشغيل Migrations
```bash
php artisan migrate
```

## 7. نشر ملفات CORS
```bash
php artisan vendor:publish --tag="cors"
```
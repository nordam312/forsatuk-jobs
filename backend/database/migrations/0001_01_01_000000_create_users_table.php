<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            // معلومات أساسية
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->string('name'); // للتوافق مع Laravel Auth
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');

            // نوع المستخدم
            $table->enum('user_type', ['freelancer', 'employer', 'client', 'admin'])->default('client');

            // معلومات الاتصال
            $table->string('phone', 20)->nullable();
            $table->string('country', 50)->nullable();
            $table->string('city', 50)->nullable();

            // معلومات الملف الشخصي
            $table->text('bio')->nullable();
            $table->string('avatar_url')->nullable();
            $table->json('skills')->nullable(); // للمستقلين
            $table->string('company_name', 100)->nullable(); // لأصحاب العمل
            $table->string('company_website')->nullable();

            // معلومات مالية
            $table->decimal('hourly_rate', 8, 2)->nullable(); // للمستقلين
            $table->decimal('balance', 10, 2)->default(0);
            $table->string('currency', 3)->default('USD');

            // إحصائيات
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('completed_projects_count')->default(0);
            $table->integer('total_reviews')->default(0);
            $table->decimal('total_earned', 12, 2)->default(0); // للمستقلين
            $table->decimal('total_spent', 12, 2)->default(0); // لأصحاب العمل

            // حالة الحساب
            $table->boolean('is_active')->default(true);
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->timestamp('featured_until')->nullable();

            // معلومات تسجيل الدخول
            $table->timestamp('last_login_at')->nullable();
            $table->string('last_login_ip', 45)->nullable();
            $table->string('last_login_platform', 20)->nullable(); // web, mobile, desktop
            $table->timestamp('last_activity_at')->nullable();

            // اللغة والإعدادات
            $table->string('preferred_language', 5)->default('ar');
            $table->json('notification_settings')->nullable();
            $table->string('timezone', 50)->default('Asia/Damascus');

            // Laravel Auth fields
            $table->rememberToken();
            $table->timestamps();

            // الفهارس
            $table->index('user_type');
            $table->index('is_active');
            $table->index('is_verified');
            $table->index('rating');
            $table->index('country');
            $table->index('city');
            $table->index('email');
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
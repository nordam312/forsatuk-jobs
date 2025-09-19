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
        Schema::table('users', function (Blueprint $table) {
            // معلومات أساسية
            $table->string('first_name', 50)->after('id');
            $table->string('last_name', 50)->after('first_name');

            // نوع المستخدم
            $table->enum('user_type', ['freelancer', 'employer', 'client', 'admin'])->default('client')->after('password');

            // معلومات الاتصال
            $table->string('phone', 20)->nullable()->after('user_type');
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

            // الفهارس
            $table->index('user_type');
            $table->index('is_active');
            $table->index('is_verified');
            $table->index('rating');
            $table->index('country');
            $table->index('city');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'first_name',
                'last_name',
                'user_type',
                'phone',
                'country',
                'city',
                'bio',
                'avatar_url',
                'skills',
                'company_name',
                'company_website',
                'hourly_rate',
                'balance',
                'currency',
                'rating',
                'completed_projects_count',
                'total_reviews',
                'total_earned',
                'total_spent',
                'is_active',
                'is_verified',
                'is_featured',
                'featured_until',
                'last_login_at',
                'last_login_ip',
                'last_login_platform',
                'last_activity_at',
                'preferred_language',
                'notification_settings',
                'timezone'
            ]);
        });
    }
};
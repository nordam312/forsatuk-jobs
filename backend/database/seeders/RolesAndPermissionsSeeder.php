<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // إنشاء الصلاحيات
        $permissions = [
            // Jobs
            'view jobs',
            'create jobs',
            'edit jobs',
            'delete jobs',
            'publish jobs',
            'feature jobs',

            // Proposals
            'view proposals',
            'create proposals',
            'edit proposals',
            'delete proposals',
            'accept proposals',
            'reject proposals',

            // Messages
            'send messages',
            'view messages',
            'delete messages',

            // Payments
            'make payments',
            'receive payments',
            'withdraw funds',
            'view transactions',

            // Users
            'view users',
            'edit users',
            'delete users',
            'ban users',
            'verify users',

            // Admin
            'access admin panel',
            'view statistics',
            'manage categories',
            'manage skills',
            'manage settings',
            'view reports',

            // Profile
            'edit own profile',
            'view profiles',
            'delete own account',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // إنشاء الأدوار

        // 1. Admin - كل الصلاحيات
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        // 2. Employer (صاحب العمل)
        $employerRole = Role::create(['name' => 'employer']);
        $employerRole->givePermissionTo([
            'view jobs',
            'create jobs',
            'edit jobs',
            'delete jobs',
            'publish jobs',
            'feature jobs',
            'view proposals',
            'accept proposals',
            'reject proposals',
            'send messages',
            'view messages',
            'make payments',
            'view transactions',
            'edit own profile',
            'view profiles',
            'delete own account',
        ]);

        // 3. Freelancer (المستقل)
        $freelancerRole = Role::create(['name' => 'freelancer']);
        $freelancerRole->givePermissionTo([
            'view jobs',
            'view proposals',
            'create proposals',
            'edit proposals',
            'delete proposals',
            'send messages',
            'view messages',
            'receive payments',
            'withdraw funds',
            'view transactions',
            'edit own profile',
            'view profiles',
            'delete own account',
        ]);

        // 4. Moderator (مشرف)
        $moderatorRole = Role::create(['name' => 'moderator']);
        $moderatorRole->givePermissionTo([
            'access admin panel',
            'view users',
            'ban users',
            'verify users',
            'view jobs',
            'delete jobs',
            'view proposals',
            'delete proposals',
            'view messages',
            'delete messages',
            'view statistics',
            'manage categories',
            'manage skills',
            'view reports',
        ]);

        // إنشاء مستخدمين للاختبار

        // Admin
        $admin = User::create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'name' => 'Admin User',
            'email' => 'admin@forsatuk.com',
            'password' => Hash::make('admin123'),
            'user_type' => 'admin',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('admin');

        // Employer للاختبار
        $employer = User::create([
            'first_name' => 'صاحب',
            'last_name' => 'عمل',
            'name' => 'صاحب عمل',
            'email' => 'employer@forsatuk.com',
            'password' => Hash::make('employer123'),
            'user_type' => 'employer',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);
        $employer->assignRole('employer');

        // Freelancer للاختبار
        $freelancer = User::create([
            'first_name' => 'مستقل',
            'last_name' => 'محترف',
            'name' => 'مستقل محترف',
            'email' => 'freelancer@forsatuk.com',
            'password' => Hash::make('freelancer123'),
            'user_type' => 'freelancer',
            'is_active' => true,
            'email_verified_at' => now(),
            'skills' => ['PHP', 'Laravel', 'React', 'JavaScript'],
            'hourly_rate' => 25.00,
            'bio' => 'مطور Full Stack محترف مع خبرة 5 سنوات',
        ]);
        $freelancer->assignRole('freelancer');

        // Moderator للاختبار
        $moderator = User::create([
            'first_name' => 'مشرف',
            'last_name' => 'الموقع',
            'name' => 'مشرف الموقع',
            'email' => 'moderator@forsatuk.com',
            'password' => Hash::make('moderator123'),
            'user_type' => 'admin',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);
        $moderator->assignRole('moderator');

        $this->command->info('Roles and permissions created successfully!');
        $this->command->info('Test accounts created:');
        $this->command->info('Admin: admin@forsatuk.com / admin123');
        $this->command->info('Employer: employer@forsatuk.com / employer123');
        $this->command->info('Freelancer: freelancer@forsatuk.com / freelancer123');
        $this->command->info('Moderator: moderator@forsatuk.com / moderator123');
    }
}
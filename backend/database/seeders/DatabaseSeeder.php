<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Projects/Jobs permissions
            'view jobs',
            'create jobs',
            'edit jobs',
            'delete jobs',

            // Proposals permissions
            'view proposals',
            'create proposals',
            'accept proposals',
            'reject proposals',

            // Services permissions
            'view services',
            'create services',
            'edit services',
            'delete services',

            // Orders permissions
            'view orders',
            'create orders',
            'manage orders',

            // Admin permissions
            'view users',
            'ban users',
            'verify users',
            'view statistics',
            'manage categories',
            'manage skills',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission, 'guard_name' => 'api']);
        }

        // Create roles
        $adminRole = Role::create(['name' => 'admin', 'guard_name' => 'api']);
        $freelancerRole = Role::create(['name' => 'freelancer', 'guard_name' => 'api']);
        $employerRole = Role::create(['name' => 'employer', 'guard_name' => 'api']);
        $clientRole = Role::create(['name' => 'client', 'guard_name' => 'api']);
        $moderatorRole = Role::create(['name' => 'moderator', 'guard_name' => 'api']);

        // Assign permissions to roles
        $adminRole->givePermissionTo(Permission::all());

        $freelancerRole->givePermissionTo([
            'view jobs',
            'view proposals',
            'create proposals',
            'view services',
            'create services',
            'edit services',
            'delete services',
            'view orders',
            'manage orders',
        ]);

        $employerRole->givePermissionTo([
            'view jobs',
            'create jobs',
            'edit jobs',
            'delete jobs',
            'view proposals',
            'accept proposals',
            'reject proposals',
            'view services',
            'view orders',
            'create orders',
        ]);

        $clientRole->givePermissionTo([
            'view jobs',
            'create jobs',
            'edit jobs',
            'delete jobs',
            'view proposals',
            'accept proposals',
            'reject proposals',
            'view services',
            'view orders',
            'create orders',
        ]);

        $moderatorRole->givePermissionTo([
            'view users',
            'ban users',
            'verify users',
            'view statistics',
            'manage categories',
            'manage skills',
        ]);

        // Create Categories and Subcategories
        $categoriesData = [
            [
                'name' => 'تصميم',
                'name_en' => 'Design',
                'icon' => 'palette',
                'color' => 'purple',
                'subcategories' => [
                    'تصاميم سوشيال ميديا',
                    'تصميم مواقع وتطبيقات',
                    'تعديل وتحسين الصور',
                    'تصاميم العلامة التجارية',
                    'تصاميم تسويقية',
                    'تصميم شعار',
                ]
            ],
            [
                'name' => 'كتابة وترجمة',
                'name_en' => 'Writing & Translation',
                'icon' => 'edit',
                'color' => 'green',
                'subcategories' => [
                    'ترجمة',
                    'كتابة إبداعية',
                    'محتوى متخصص',
                    'محتوى مواقع',
                    'محتوى دراسي ومهني',
                    'محتوى سوشيال ميديا',
                ]
            ],
            [
                'name' => 'تسويق رقمي',
                'name_en' => 'Digital Marketing',
                'icon' => 'trending-up',
                'color' => 'orange',
                'subcategories' => [
                    'خطط تسويقية',
                    'استشارات تسويقية',
                    'تحسين محركات البحث',
                    'إعلانات مواقع التواصل',
                    'إدارة حسابات التواصل',
                    'التسويق عبر مواقع التواصل',
                ]
            ],
            [
                'name' => 'برمجة وتطوير',
                'name_en' => 'Programming & Development',
                'icon' => 'code',
                'color' => 'blue',
                'subcategories' => [
                    'ووردبريس',
                    'تطوير مواقع',
                    'دعم فني تقني',
                    'تطوير برمجيات',
                    'إنشاء متجر إلكتروني',
                    'برمجة تطبيقات جوال',
                ]
            ],
            [
                'name' => 'فيديو وأنيميشن',
                'name_en' => 'Video & Animation',
                'icon' => 'video',
                'color' => 'red',
                'subcategories' => [
                    'تصميم انترو',
                    'مونتاج فيديو',
                    'أنيميشن وموشن جرافيك',
                    'إنتاج الفيديو',
                    'فيديوهات سوشيال ميديا',
                ]
            ],
            [
                'name' => 'أخرى',
                'name_en' => 'Other',
                'icon' => 'grid',
                'color' => 'gray',
                'subcategories' => [
                    'هندسة وعمارة',
                    'تعليم الطبخ',
                    'صحة وتغذية',
                    'ألعاب',
                ]
            ],
        ];

        foreach ($categoriesData as $index => $categoryData) {
            $category = Category::create([
                'name_ar' => $categoryData['name'],
                'name_en' => $categoryData['name_en'],
                'slug' => Str::slug($categoryData['name_en']),
                'icon' => $categoryData['icon'],
                'color' => $categoryData['color'],
                'is_popular' => $index < 4, // First 4 categories are popular
                'order' => $index + 1,
                'is_active' => true,
            ]);

            // Create subcategories
            foreach ($categoryData['subcategories'] as $subIndex => $subcategoryName) {
                Subcategory::create([
                    'category_id' => $category->id,
                    'name_ar' => $subcategoryName,
                    'name_en' => $this->translateToEnglish($subcategoryName),
                    'slug' => Str::slug($this->translateToEnglish($subcategoryName)),
                    'is_popular' => $subIndex < 3, // First 3 subcategories are popular
                    'order' => $subIndex + 1,
                    'is_active' => true,
                ]);
            }
        }

        // Create test users
        // Admin user
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@forsatuk.com',
            'first_name' => 'Admin',
            'last_name' => 'User',
            'user_type' => 'admin',
        ]);
        $admin->assignRole('admin');

        // Freelancer user
        $freelancer = User::factory()->create([
            'name' => 'محمد أحمد',
            'email' => 'freelancer@forsatuk.com',
            'first_name' => 'محمد',
            'last_name' => 'أحمد',
            'user_type' => 'freelancer',
            'skills' => json_encode(['PHP', 'Laravel', 'React', 'JavaScript']),
            'hourly_rate' => 50,
            'bio' => 'مطور ويب محترف مع خبرة 5 سنوات في تطوير التطبيقات',
        ]);
        $freelancer->assignRole('freelancer');

        // Employer user
        $employer = User::factory()->create([
            'name' => 'شركة التقنية',
            'email' => 'employer@forsatuk.com',
            'first_name' => 'أحمد',
            'last_name' => 'الخالد',
            'user_type' => 'employer',
            'company_name' => 'شركة التقنية المتقدمة',
            'company_website' => 'https://tech-company.com',
        ]);
        $employer->assignRole('employer');
    }

    /**
     * Translate Arabic subcategory names to English
     */
    private function translateToEnglish($arabicName)
    {
        $translations = [
            // Design subcategories
            'تصاميم سوشيال ميديا' => 'Social Media Designs',
            'تصميم مواقع وتطبيقات' => 'Web & App Design',
            'تعديل وتحسين الصور' => 'Photo Editing & Enhancement',
            'تصاميم العلامة التجارية' => 'Brand Identity Design',
            'تصاميم تسويقية' => 'Marketing Designs',
            'تصميم شعار' => 'Logo Design',

            // Writing & Translation subcategories
            'ترجمة' => 'Translation',
            'كتابة إبداعية' => 'Creative Writing',
            'محتوى متخصص' => 'Specialized Content',
            'محتوى مواقع' => 'Website Content',
            'محتوى دراسي ومهني' => 'Academic & Professional Content',
            'محتوى سوشيال ميديا' => 'Social Media Content',

            // Digital Marketing subcategories
            'خطط تسويقية' => 'Marketing Plans',
            'استشارات تسويقية' => 'Marketing Consultancy',
            'تحسين محركات البحث' => 'SEO',
            'إعلانات مواقع التواصل' => 'Social Media Ads',
            'إدارة حسابات التواصل' => 'Social Media Management',
            'التسويق عبر مواقع التواصل' => 'Social Media Marketing',

            // Programming & Development subcategories
            'ووردبريس' => 'WordPress',
            'تطوير مواقع' => 'Web Development',
            'دعم فني تقني' => 'Technical Support',
            'تطوير برمجيات' => 'Software Development',
            'إنشاء متجر إلكتروني' => 'E-commerce Development',
            'برمجة تطبيقات جوال' => 'Mobile App Development',

            // Video & Animation subcategories
            'تصميم انترو' => 'Intro Design',
            'مونتاج فيديو' => 'Video Editing',
            'أنيميشن وموشن جرافيك' => 'Animation & Motion Graphics',
            'إنتاج الفيديو' => 'Video Production',
            'فيديوهات سوشيال ميديا' => 'Social Media Videos',

            // Other subcategories
            'هندسة وعمارة' => 'Engineering & Architecture',
            'تعليم الطبخ' => 'Cooking Education',
            'صحة وتغذية' => 'Health & Nutrition',
            'ألعاب' => 'Games',
        ];

        return $translations[$arabicName] ?? $arabicName;
    }
}
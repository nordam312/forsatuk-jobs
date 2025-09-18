<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:5173',  // Vite React Dev
        'http://localhost:3000',  // React Alternative
        'http://localhost:8080',  // Frontend Dev
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:8080',  // Frontend Dev Alternative
        // إضافة نطاقات الإنتاج هنا
        // 'https://forsatuk.com',
        // 'https://www.forsatuk.com',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [
        'X-Total-Count',
        'X-Page-Count',
        'X-Current-Page',
        'X-Per-Page'
    ],

    'max_age' => 0,

    'supports_credentials' => true, // مهم جداً للـ Cookies

];
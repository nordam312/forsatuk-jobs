<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // CORS للـ API
        $middleware->api(prepend: [
            \Illuminate\Http\Middleware\HandleCors::class,
        ]);

        // تسجيل Middleware Aliases
        $middleware->alias([
            'jwt.auth' => \App\Http\Middleware\JWTAuthenticate::class,
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
        ]);

        // Rate limiting للـ API
        $middleware->throttleApi();

        // CORS configuration
        $middleware->validateCsrfTokens(except: [
            'api/*',
            'auth/*'
        ]);

        // Exclude JWT cookies from encryption
        $middleware->encryptCookies(except: [
            'jwt_token',
            'jwt_refresh_token'
        ]);

        // Trust proxies for production
        $middleware->trustProxies(at: '*');
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();

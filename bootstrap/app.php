<?php
// bootstrap/app.php
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\UpdateSessionLastActivity;
use Illuminate\Http\Request;
# use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response;
# use Throwable;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            UpdateSessionLastActivity::class,
        ]);

        $middleware->alias([
            'has.role' => \App\Http\Middleware\EnsureUserHasRole::class,
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            if (! app()->environment(['local', 'testing'])) {
                if($exception instanceof \Illuminate\Validation\ValidationException) {
                    return $response;
                }

                if (in_array($response->getStatusCode(), [500, 503, 404, 403])) {
                    return Inertia::render('Errors/ErrorPage', ['status' => $response->getStatusCode()])
                        ->toResponse($request)
                        ->setStatusCode($response->getStatusCode());
                } elseif ($response->getStatusCode() === 419) {
                    return back()->with([
                        'message' => 'The page expired, please try again.',
                    ]);
                }
            }
    
            return $response;
        });
    })->create();

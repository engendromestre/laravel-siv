<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class EnsureUserHasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        // Verifica se o usuário está autenticado e se não tem permissões definidas
        if ($user && ($user->permissions->isEmpty() && $user->roles->isEmpty())) {
            return Redirect::route('guest.page');
        }

        return $next($request);
    }
}

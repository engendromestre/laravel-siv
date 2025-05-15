<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Mail;
use App\Mail\CompleteRegistrationMail;

class RegisteredUserController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $this->authorize('admin users:create', User::class);
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $this->authorize('admin users:create', User::class);
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            # 'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            # 'password' => Hash::make($request->password),
            'password' => null,
        ]);

        // Gera o link assinado válido por 60 minutos
        $signedUrl = URL::temporarySignedRoute(
            'register.complete',
            now()->addDays(2),
            ['user' => $user->id]
        );

         // Envia o e-mail com o link para completar o cadastro
        Mail::to($user->email)->send(new CompleteRegistrationMail($signedUrl));

        return redirect()->route('role.index')->with('success', 'Usuário registrado. Verifique o e-mail do novo usuário para completar o cadastro.');
    }

    public function complete(Request $request, User $user): Response
    {
        if (! $request->hasValidSignature()) {
            abort(403, 'Link de registro inválido ou expirado.');
        }

        return Inertia::render('Auth/CompleteRegistration', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'confirmed', Password::min(8)->letters()->numbers()->mixedCase()->symbols()],
        ]);

        $user->update([
            'password' => Hash::make($request->password),
            'email_verified_at' => now(),
        ]);

        Auth::login($user);

        return redirect()->route('dashboard');
    }
}

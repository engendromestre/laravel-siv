<?php

namespace App\Services\Auth;

use App\Repositories\UserRepository;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/**
 * Serviço responsável pelo fluxo de autenticação via provedores OAuth.
 */
class SocialiteService
{
    protected UserRepository $userRepository;

    /**
     * Construtor para injetar dependências.
     *
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Redireciona o usuário para a página de autenticação do provedor.
     *
     * @param string $provider
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function redirectToProvider(string $provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Lida com o callback do provedor e autentica o usuário.
     *
     * @param string $provider
     * @return \Illuminate\Http\RedirectResponse|\Inertia\Response
     */
    public function handleProviderCallback(string $provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();

            // Verificar se o usuário já existe no banco de dados
            $user = $this->userRepository->updateOrCreate(
                [
                    'email' => $socialUser->getEmail(), // Usando o e-mail como chave de busca
                ],
                [
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'name' => $socialUser->getName(),
                    'email' => $socialUser->getEmail(),
                    'provider_token' => $socialUser->token
                ]
            );
            $user->markEmailAsVerified();

            Auth::login($user);

            return redirect('/dashboard');
        } catch (\Exception $e) {
            return redirect()->route('login', ['message' => 'Erro de Exceção' . $e->getMessage()]);
        }
    }
}

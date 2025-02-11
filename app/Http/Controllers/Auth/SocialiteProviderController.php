<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Auth\SocialiteService;

/**
 * Controlador responsável por gerenciar a autenticação via provedores OAuth.
 */
class SocialiteProviderController extends Controller
{
    protected SocialiteService $socialiteAuthService;

    /**
     * Construtor para injetar dependências.
     *
     * @param SocialiteAuthService $socialiteAuthService
     */
    public function __construct(SocialiteService $socialiteAuthService)
    {
        $this->socialiteAuthService = $socialiteAuthService;
    }

    /**
     * Redireciona o usuário para a página de login do provedor.
     *
     * @param string $provider
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function redirect(string $provider)
    {
        return $this->socialiteAuthService->redirectToProvider($provider);
    }

    /**
     * Processa o retorno do provedor e autentica o usuário.
     *
     * @param string $provider
     * @return \Illuminate\Http\RedirectResponse|\Inertia\Response
     */
    public function callback(string $provider)
    {
        return $this->socialiteAuthService->handleProviderCallback($provider);
    }
}

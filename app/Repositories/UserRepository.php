<?php

namespace App\Repositories;

use App\Models\User;

/**
 * Classe responsável por interagir com o banco de dados para operações relacionadas ao usuário.
 */
class UserRepository
{
    /**
     * Busca um usuário pelo e-mail.
     *
     * @param string $email
     * @return User|null
     */
    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    /**
     * Busca um usuário pelo ID.
     *
     * @param int $id
     * @return User
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findById(int $id): User
    {
        $user = User::with(['roles.permissions'])->findOrFail($id);
        return $user;
    }

    /**
     * Busca um usuário pelo provedor de autenticação e ID do provedor.
     *
     * @param string $provider
     * @param string $providerId
     * @return User|null
     */
    public function findByProvider(string $provider, string $providerId): ?User
    {
        return User::where([
            'provider' => $provider,
            'provider_id' => $providerId
        ])->first();
    }

    /**
     * Cria ou atualiza um usuário no banco de dados.
     *
     * @param array $conditions
     * @param array $data
     * @return User
     */
    public function updateOrCreate(array $conditions, array $data): User
    {
        return User::updateOrCreate($conditions, $data);
    }


    /**
     * Atualiza um usuário no banco de dados.
     *
     * @param User $user
     * @param array $data
     * @return bool
     */
    public function update(User $user, array $data): bool
    {
        return $user->update($data);
    }
}

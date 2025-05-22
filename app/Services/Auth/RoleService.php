<?php

/**
 * @package App\Services\Auth
 * @author Paulo Oliveira <https://github.com/engendromestre>
 */

namespace App\Services\Auth;

use App\Services\Auth\UserService;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

/**
 * Class RoleService
 * @package App\Services\Auth
 */
class RoleService
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }


    /**
     * Retorna todos os papeis com usu rios e permiss es relacionadas.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getRoles()
    {
        // Eager loading de usu rios e permiss es
        $query = Role::with([
            'users:id,name,email',
            'users.roles:id,name',
            'permissions:id,name'
        ]);

        return $query->get();
    }

    private function validatedRole(Request $request, $ignoreRoleId = null)
    {
        $rules = [
            'users_ids' => 'required|array',
            'users_ids.*' => 'integer|exists:users,id',
            'permissions_ids' => 'required|array',
            'permissions_ids.*' => 'integer|exists:permissions,id',
        ];

        // Apenas na edição, exigimos um role_id válido
        if ($ignoreRoleId) {
            $rules['role_id'] = 'required|integer|exists:roles,id';
        }

        // Regra condicional para o campo 'name'
        $rules['name'] = [
            'required',
            'string',
            'min:5',
            'max:255',
            $ignoreRoleId
                ? Rule::unique('roles', 'name')->ignore($ignoreRoleId)
                : 'unique:roles,name',
        ];

        return $request->validate(
            $rules,
            [
                'permissions_ids.required' => 'Selecione pelo menos uma permissão.',
            ]
        );
    }

    public function createRole(Request $request)
    {
        $validated = $this->validatedRole($request);
        return DB::transaction(function () use ($validated) {
            // Criar o Role dentro da transação
            $role = Role::create(['name' => $validated['name']]);

            // Atribuir permissões ao Role
            $role->syncPermissions($validated['permissions_ids']);

            // Atribuir Role aos usuários (se houver usuários na requisição)
            if (!empty($validated['users_ids'])) {
                foreach ($validated['users_ids'] as $userId) {
                    $user = User::find($userId);
                    if ($user) {
                        $user->assignRole($role->name); // Atribui a Role ao usuário
                    }
                }
            }

            return response()->json([
                'message' => 'Papel criado com sucesso!',
                'role' => $role,
            ], 201);
        });
        return;
    }

    public function updateRole(Request $request)
    {
        $validated = $this->validatedRole($request, $request->input('role_id'));

        return DB::transaction(function () use ($validated) {
            // 1. Encontra o role a ser atualizado
            $role = Role::findOrFail($validated['role_id']);

            // 2. Atualiza os dados básicos do role
            $role->update([
                'users_ids' => $validated['users_ids'],
                'name' => $validated['name'],
            ]);

            // 3. Sincroniza as permissões (remove as antigas e adiciona as novas)
            $role->permissions()->sync($validated['permissions_ids']);

            // 4. Sincroniza os usuários associados ao role
            if (isset($validated['users_ids']) && is_array($validated['users_ids'])) {
                // Remove todas as associações existentes de usuários para este role
                DB::table('model_has_roles')
                    ->where('role_id', $role->id)
                    ->where('model_type', User::class)
                    ->delete();

                // Atribui os novos usuários ao role
                foreach ($validated['users_ids'] as $userId) {
                    $user = User::find($userId);
                    if ($user) {
                        $user->assignRole($role->name);
                         // Notifica o usuário que ele agora tem permissões
                        $this->userService->notifyPermissionsAssigned($user);
                    }
                }
            }

            // 5. Retorna a resposta de sucesso
            return response()->json([
                'message' => 'Papel atualizado com sucesso',
                'data' => $role->load(['permissions', 'users'])
            ], 200);
        });
    }

    public function deleteRole(Request $request)
    {
        try {
            // Validação para garantir que um ID de role seja enviado na requisição
            $request->validate([
                'id' => 'required|exists:roles,id',
            ]);

            // Encontrar a role pelo ID
            $role = Role::findOrFail($request->id);

            // Deletar a role
            $role->delete();
        } catch (\Exception $e) {
            throw new \Exception('Erro ao deletar o papel');
        }
    }
}

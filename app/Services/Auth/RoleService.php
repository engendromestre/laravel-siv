<?php

/**
 * @package App\Services\Auth
 * @author Paulo Oliveira <https://github.com/engendromestre>
 */

namespace App\Services\Auth;

use Spatie\Permission\Models\Role;

/**
 * Class RoleService
 * @package App\Services\Auth
 */
class RoleService
{
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

    public function createRole(array $data)
    {
        return DB::transaction(function () use ($data) {
            $role = Role::create(['name' => $data['roleName']]);
            $role->syncPermissions($data['permissionsId'] ?? []);
            return $role;
        });
    }

    public function updateRole(int $id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            $role = Role::findOrFail($id);
            $role->update(['name' => $data['roleName']]);
            $role->syncPermissions($data['permissionsId'] ?? []);
            return $role;
        });
    }
}

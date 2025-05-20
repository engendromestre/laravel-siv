<?php

namespace App\Policies;

use App\Models\User;
use Spatie\Permission\Models\Role;

class RolePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('admin roles:read');
    }

    public function view(User $user, Role $role): bool
    {
        return $user->hasPermissionTo('admin roles:read');
    }

    public function create(User $user): bool
    {
        return $user->hasPermissionTo('admin roles:create');
    }

    public function update(User $user, Role $role): bool
    {
        return $user->hasPermissionTo('admin roles:write');
    }

    public function delete(User $user, Role $role): bool
    {
        return $user->hasPermissionTo('admin roles:write');
    }
}

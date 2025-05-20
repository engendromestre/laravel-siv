<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

/**
 * Class UserService
 * @package App\Services\Auth
 * @author Paulo Oliveira <https://github.com/engendromestre>
 */
class UserService
{
    private const DEFAULT_PER_PAGE = 10;

    /**
     * @param array $filters
     * @throws \Exception
     */
    public function getUsersWithRoles(array $filters)
    {
        $query = User::query()
            ->with(['roles:id,name']);

        // Ordenação
        if (!empty($filters['sortField']) && !empty($filters['sortOrder'])) {
            if ($filters['sortField'] === 'roles') {
                // Subconsulta para contar o número de roles
                $query->select('users.*')
                    ->leftJoinSub(
                        DB::table('model_has_roles')
                            ->select('model_id', DB::raw('count(*) as roles_count'))
                            ->where('model_type', User::class)
                            ->groupBy('model_id'),
                        'role_counts',
                        'users.id',
                        '=',
                        'role_counts.model_id'
                    );
                $query->orderBy('role_counts.roles_count', $filters['sortOrder']);
            } elseif (in_array($filters['sortField'], ['id', 'name', 'email'])) {
                $query->orderBy($filters['sortField'], $filters['sortOrder']);
            } else {
                $query->orderBy('created_at', 'desc');
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }

        // Filtragem
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where('name', 'like', "%{$search}%");
        }

        // Paginação
        $perPage = $filters['perPage'] ?? self::DEFAULT_PER_PAGE;
        $users = $query->paginate($perPage);

        $users->getCollection()->transform(function ($user) {
            $user->permissions = $user->getAllPermissions()->pluck('name', 'id');
            return $user;
        });

        return $users;
    }

    public function getUsersWithPermissions(array $filters)
    {
        $query = User::query()
            ->with(['roles.permissions:id,name', 'permissions:id,name']); // Carrega relações necessárias

        // Filtro de busca
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Ordenação
        if (!empty($filters['sortField']) && !empty($filters['sortOrder'])) {
            switch ($filters['sortField']) {
                case 'permissions':
                    // Ordenação por contagem de permissões diretas (solução simplificada)
                    $query->withCount('permissions')
                        ->orderBy('permissions_count', $filters['sortOrder']);
                    break;
                case 'roles':
                    // Ordenação por contagem de roles
                    $query->withCount('roles')
                        ->orderBy('roles_count', $filters['sortOrder']);
                    break;
                case in_array($filters['sortField'], ['id', 'name', 'email']):
                    $query->orderBy($filters['sortField'], $filters['sortOrder']);
                    break;
                default:
                    $query->orderBy('created_at', 'desc');
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }

        // Paginação
        $perPage = $filters['perPage'] ?? self::DEFAULT_PER_PAGE;
        $users = $query->paginate($perPage);

        // Transformar os resultados para incluir todas as permissões formatadas
        $users->getCollection()->transform(function ($user) {
            $user->all_permissions = $user->getAllPermissions()
                ->mapWithKeys(fn ($permission) => [$permission->id => $permission->name])
                ->toArray();
            
            $user->direct_permissions = $user->permissions
                ->mapWithKeys(fn ($permission) => [$permission->id => $permission->name])
                ->toArray();
                
            $user->role_permissions = $user->getPermissionsViaRoles()
                ->mapWithKeys(fn ($permission) => [$permission->id => $permission->name])
                ->toArray();
                
            return $user;
        });

        return $users;
    }
}

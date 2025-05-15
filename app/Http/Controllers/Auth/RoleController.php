<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Auth\RoleService;
use App\Services\Auth\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class RoleController extends Controller
{
    use AuthorizesRequests;

    private $roleService;
    private $userService;

    public function __construct(RoleService $roleService, UserService $userService)
    {
        $this->roleService = $roleService;
        $this->userService = $userService;
    }

    public function index(Request $request): Response
    {
        $this->authorize('admin roles:read', Role::class);
        $users = User::select('id', 'name')->get();
        $roles = $this->roleService->getRoles();
        $permissions = Permission::select('id', 'name')->get();
        $usersWithRoles = $this->userService->getUsersWithRoles($request->all());
        return Inertia::render('Auth/Role/Index', [
            'users' => $users,
            'roles' => $roles,
            'permissions' =>  $permissions,
            'data' => $usersWithRoles,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('admin roles:create', Role::class);
        $this->roleService->createRole($request);
        return Redirect::route('role.index');
    }

    public function update(Request $request): RedirectResponse
    {
        $this->authorize('admin roles:write', Role::class);
        $this->roleService->updateRole($request);
        return Redirect::route('role.index');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $this->authorize('admin roles:write', Role::class);
        $this->roleService->deleteRole($request);
        return Redirect::route('role.index');
    }
}

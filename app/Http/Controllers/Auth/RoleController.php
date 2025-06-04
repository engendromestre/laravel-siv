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

    /**
     * Display a listing of roles, permissions, and users with their permissions.
     *
     * This method authorizes the user to read roles, retrieves all users with their
     * permissions, fetches all roles and permissions, and returns a response to render
     * the 'Auth/Role/Index' page with the retrieved data.
     *
     * @param Request $request
     * @return Response
     */

    public function index(Request $request): Response
    {
        $this->authorize('auth roles:read', Role::class);            
        $roles = $this->roleService->getRoles();
        $permissions = Permission::select('id', 'name')->get();
        $usersWithPermissions = $this->userService->getUsersWithPermissions($request->all());
        return Inertia::render('Auth/Role/Index', [
            'roles' => $roles,
            'permissions' =>  $permissions,
            'data' => $usersWithPermissions,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('auth roles:create', Role::class);
        $this->roleService->createRole($request);
        return Redirect::route('role.index');
    }

    public function update(Request $request): RedirectResponse
    {
        $this->authorize('auth roles:write', Role::class);
        $this->roleService->updateRole($request);
        return Redirect::route('role.index');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $this->authorize('auth roles:write', Role::class);
        $this->roleService->deleteRole($request);
        return Redirect::route('role.index');
    }
}

<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Auth\RoleService;
use App\Services\Auth\UserService;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    private $roleService;
    private $userService;

    public function __construct(RoleService $roleService, UserService $userService)
    {
        $this->roleService = $roleService;
        $this->userService = $userService;
    }

    public function index(Request $request): Response
    {
        $roles = $this->roleService->getRoles();
        $permissions = Permission::select('id', 'name')->get();
        $usersWithRoles = $this->userService->getUsersWithRoles($request->all());
        return Inertia::render('Auth/Role/Index', [
            'roles' => $roles,
            'permissions' =>  $permissions,
            'data' => $usersWithRoles,
        ]);
    }
}

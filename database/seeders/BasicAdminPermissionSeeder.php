<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class BasicAdminPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'auth users:read',
            'auth users:write',
            'auth users:create',
            'auth roles:read',
            'auth roles:write',
            'auth roles:create',
            'admin patients:read',
            'admin patients:write',
            'admin patients:create',
            'admin admissions:read',
            'admin admissions:write',
            'admin admissions:create',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Criar papéis e associar permissões
        $adminRole = Role::firstOrCreate(['name' => 'Administrador']);
        $adminRole->givePermissionTo($permissions);

        $user = \App\Models\User::factory()->create([
            'name' => 'Super Admin',
            'email' => env('APP_USER_ADMIN_EMAIL'),
            'password' => env('APP_USER_ADMIN_PASS'),
        ]);
        $user->assignRole($adminRole);
    }
}

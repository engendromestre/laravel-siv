<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use App\Models\User;

class CreateSuperAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     */
    protected $signature = 'create:superadmin';

    /**
     * The console command description.
     */
    protected $description = 'Cria superusuário com permissões e papel de Administrador';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Iniciando criação do superusuário e permissões...');

        // Limpa cache de permissões e papéis
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

        $adminRole = Role::firstOrCreate(['name' => 'Administrador']);
        $adminRole->syncPermissions($permissions);

        $email = config('admin.email') ?: env('APP_USER_ADMIN_EMAIL', 'cantidio-informatica@saude.sp.gov.br');
        $password = config('admin.password') ?: env('APP_USER_ADMIN_PASS', 'C@isxxxxx');

        $user = User::updateOrCreate(
            ['email' => $email],
            [
                'name' => 'Super Admin',
                'password' => bcrypt($password),
            ]
        );

        $user->assignRole($adminRole);

        $this->info("Superusuário criado/atualizado: {$user->email}");
    }
}

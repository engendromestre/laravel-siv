<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Permission\Models\Permission;

class PermissionManager extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'permission:manage {action} {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create or delete a permission';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $action = $this->argument('action');
        $name = $this->argument('name');

        if ($action === 'create') {
            Permission::firstOrCreate(['name' => $name]);
            $this->info("Permission '{$name}' created.");
        } elseif ($action === 'delete') {
            $permission = Permission::where('name', $name)->first();
            if ($permission) {
                $permission->delete();
                $this->info("Permission '{$name}' deleted.");
            } else {
                $this->error("Permission '{$name}' not found.");
            }
        } else {
            $this->error("Invalid action. Use 'create' or 'delete'.");
        }
    }
}

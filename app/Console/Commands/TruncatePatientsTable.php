<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class TruncatePatientsTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:truncate-patients-table';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Apagar os dados da tabela de usuários
        DB::table('patients')->truncate();
        $this->info('Patients table truncated successfully.');

        // Executar o seeder dos usuários
        $this->call('db:seed', ['--class' => 'PatientSeeder']);
        $this->info('PatientSeeder executed successfully.');
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Patient;
use App\Models\Admission;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $patients = Patient::factory()->count(10)->create(); // Cria 10 pacientes aleatórios

        // Criar 20 admissões, com alguns pacientes repetidos
        Admission::factory()->count(20)->create([
            'user_id' => 1,    // Usar um ID específico de usuário
        ])->each(function ($admission) use ($patients) {
            // Selecione aleatoriamente um paciente já existente
            $randomPatient = $patients->random();

            // Atribua o paciente aleatório à admissão
            $admission->update([
                'patient_id' => $randomPatient->id,
            ]);
        });
    }
}

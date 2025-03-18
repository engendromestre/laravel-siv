<?php

namespace Database\Factories;

use App\Models\Admission;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admission>
 */
class AdmissionFactory extends Factory
{
    protected $model = Admission::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'patient_id' => Patient::where('status', 'i')->inRandomOrder()->first()?->id ?? Patient::factory(),
            'admission_datetime' => $this->faker->dateTime()->format('Y-m-d H:i:s'),
            'discharge_datetime' => $this->faker->optional()->dateTime()?->format('Y-m-d H:i:s'),
            'reason_for_admission' => $this->faker->optional()->sentence(),
            'user_id' => User::factory(), // Criando um usuário relacionado automaticamente
            'notes' => $this->faker->optional()->text(),
        ];
    }
}

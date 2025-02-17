<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'birthDate' => $this->faker->date(),
            'motherName' => $this->faker->name('female'),
            'status' => $this->faker->randomElement(['a', 'i']),
            'photos' => json_encode([
                $this->faker->randomElement([
                    'https://i.pravatar.cc/150?img=' . rand(1, 70)
                ]),
            ]),
        ];
    }
}

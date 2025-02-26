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
        $gender = $this->faker->randomElement(['m', 'f']);
        $name = $gender === 'm' ? $this->faker->name('male') : $this->faker->name('female');

        $imageId = rand(1, 99);
        $photoUrl = $gender === 'm'
            ? "https://randomuser.me/api/portraits/men/{$imageId}.jpg"
            : "https://randomuser.me/api/portraits/women/{$imageId}.jpg";
        return [
            'register' => $this->faker->randomNumber(9),
            'name' => $name,
            'gender' => $gender,
            'birthDate' => $this->faker->date('Y-m-d', '2016-12-31'),
            'motherName' => $this->faker->name('female'),
            'status' => $this->faker->randomElement(['a', 'i']),
            'photo' => $photoUrl
        ];
    }
}

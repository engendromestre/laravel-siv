<?php

namespace App\Http\Services\Auth;

use Illuminate\Validation\Rules\Password;

class PasswordValidationService
{
    /**
     * Retorna as regras personalizadas para validação de senha.
     */
    public static function rules(): array
    {
        return [
            'required',
            Password::min(8) // Mínimo de 8 caracteres
                ->letters() // Pelo menos uma letra
                ->mixedCase() // Pelo menos uma letra maiúscula e uma minúscula
                ->numbers() // Pelo menos um número
                ->symbols() // Pelo menos um caractere especial
                ->uncompromised(), // Verifica se a senha não foi comprometida em vazamentos de dados
            'confirmed', // Exige confirmação da senha
        ];
    }

    public static function jsonRules(): string
    {
        $rules = [
            'required' => true,
            'min_length' => 8,
            'requires_letters' => true,
            'requires_mixed_case' => true,
            'requires_numbers' => true,
            'requires_symbols' => true,
            'uncompromised' => true,
            'confirmed' => true
        ];

        return json_encode($rules, JSON_PRETTY_PRINT);
    }
}

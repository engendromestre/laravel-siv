import { usePasswordRules } from '@/Hooks/usePasswordRules';
import { Box, Typography } from '@mui/material';

const getPasswordStrength = (
    password: string,
    rules: { [key: string]: any },
) => {
    let strength = 0;
    /*
     rules = {
       min_length: 8,
       requires_mixed_case: true,
       requires_letters: true,
       requires_numbers: true,
       requires_symbols: true,
       uncompromised: true,
     }
    */
    if (password.length >= (rules.min_length || 0)) strength += 1;
    if (/[A-Z]/.test(password) && rules.requires_mixed_case) strength += 1;
    if (/[a-z]/.test(password) && rules.requires_mixed_case) strength += 1;
    if (/[0-9]/.test(password) && rules.requires_numbers) strength += 1;
    if (/[^A-Za-z0-9]/.test(password) && rules.requires_symbols) strength += 1;

    // Ensure strength does not exceed the maximum index of strengthLabels and strengthColors
    return Math.min(strength, 4);
};

const PasswordStrengthMeter = ({ password }: { password: string }) => {
    const rules = usePasswordRules();
    const strength = getPasswordStrength(password, rules);
    const strengthLabels = [
        'A senha só será aceita se for Muito Forte',
        'Fraca',
        'Média',
        'Forte',
        'Muito Forte',
    ];
    const strengthColors = [
        '#ff4d4d',
        '#ff944d',
        '#ffd11a',
        '#80ff80',
        '#33cc33',
    ];

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
                <Typography component="span" variant="body2" fontWeight="bold">
                    Força da Senha:
                </Typography>{' '}
                {strengthLabels[strength]}
            </Typography>
            <Box
                sx={{
                    height: '10px',
                    width: '100%',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    mt: 1,
                }}
            >
                <Box
                    sx={{
                        height: '100%',
                        width: `${strength === 4 ? 100 : (strength / 4) * 100}%`,
                        backgroundColor: strengthColors[strength],
                        transition: 'width 0.3s ease-in-out',
                    }}
                />
            </Box>
        </Box>
    );
};

export default PasswordStrengthMeter;

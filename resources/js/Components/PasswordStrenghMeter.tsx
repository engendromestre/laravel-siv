import { usePasswordRules } from '@/Hooks/usePasswordRules';
import CheckIcon from '@mui/icons-material/Check';
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';

const getPasswordStrength = (
    password: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rules: { [key: string]: any },
) => {
    let strength = 0;

    // Lista de regras relevantes para validação da senha
    const relevantRules = [
        'min_length',
        'requires_letters',
        'requires_mixed_case',
        'requires_numbers',
        'requires_symbols',
    ];

    // Verifica se o comprimento mínimo foi atendido
    if (password.length >= (rules.min_length || 0)) strength += 1;

    // Verifica outras regras
    if (/[A-Z]/.test(password) && rules.requires_mixed_case) strength += 1;
    if (/[a-z]/.test(password) && rules.requires_mixed_case) strength += 1;
    if (/[0-9]/.test(password) && rules.requires_numbers) strength += 1;
    if (/[^A-Za-z0-9]/.test(password) && rules.requires_symbols) strength += 1;

    // Calcula o número total de regras ativas
    const totalRules = relevantRules.filter(
        (key) => rules[key] !== false,
    ).length;

    // A força máxima só é atingida se todas as regras forem atendidas
    const isAllRulesSatisfied = strength === totalRules;

    // Retorna a força da senha (0 a 4)
    return isAllRulesSatisfied ? 4 : Math.min(strength, 3);
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
        '#ff4d4d', // Fraca
        '#ff944d', // Média
        '#8B4513', // Forte
        '#6495ED', // Muito Forte
        '#33cc33', // Muito Forte (todas as regras atendidas)
    ];

    const caseColors: { [key: string]: string } = {
        min_length: '#ff4d4d',
        requires_letters: '#ff944d',
        requires_mixed_case: '#8B4513',
        requires_numbers: '#6495ED',
        requires_symbols: '#33cc33',
        uncompromised: '#33cc33',
    };

    // Função para verificar se uma regra foi atendida
    const isRuleSatisfied = (key: string, value: unknown) => {
        switch (key) {
            case 'min_length':
                return password.length >= (value as number);
            case 'requires_letters':
                return /[A-Za-z]/.test(password);
            case 'requires_mixed_case':
                return /[A-Z]/.test(password) && /[a-z]/.test(password);
            case 'requires_numbers':
                return /[0-9]/.test(password);
            case 'requires_symbols':
                return /[^A-Za-z0-9]/.test(password);
            default:
                return false;
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
                <Typography component="span" variant="body2" fontWeight="bold">
                    Força da Senha:
                </Typography>{' '}
                {strengthLabels[strength]}
            </Typography>
            <List dense>
                {rules &&
                    Object.entries(rules).map(([key, value]) => {
                        const isSatisfied = isRuleSatisfied(key, value);
                        return (
                            <ListItem key={key} disablePadding>
                                <ListItemIcon
                                    sx={{
                                        marginLeft: '10px',
                                        color: isSatisfied
                                            ? caseColors[key]
                                            : 'inherit',
                                    }}
                                >
                                    {isSatisfied && <CheckIcon />}
                                </ListItemIcon>
                                <ListItemText
                                    sx={{
                                        marginLeft: '10px',
                                        color: caseColors[key],
                                    }}
                                    primary={(() => {
                                        switch (key) {
                                            case 'min_length':
                                                return `Mínimo de ${value} caracteres`;
                                            case 'requires_letters':
                                                return `Precisa ter letras`;
                                            case 'requires_mixed_case':
                                                return `Requer letras maiúsculas e minúsculas`;
                                            case 'requires_numbers':
                                                return `Requer pelo menos um número`;
                                            case 'requires_symbols':
                                                return `Requer pelo menos um símbolo`;
                                            default:
                                                return;
                                        }
                                    })()}
                                />
                            </ListItem>
                        );
                    })}
            </List>
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
                        width: `${(strength / 4) * 100}%`,
                        backgroundColor: strengthColors[strength],
                        transition: 'width 0.3s ease-in-out',
                    }}
                />
            </Box>
        </Box>
    );
};

export default PasswordStrengthMeter;

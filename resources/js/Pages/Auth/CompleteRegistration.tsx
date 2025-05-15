import CardProj from '@/Components/CardProj';
import PasswordStrengthMeter from '@/Components/PasswordStrenghMeter';
import { Head, useForm } from '@inertiajs/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import React, { FormEventHandler } from 'react';

interface CompleteRegistrationProps {
    user: {
        id: number;
        name: string;
        email: string;
    };
}

export default function CompleteRegistration({
    user,
}: CompleteRegistrationProps) {
    const theme = useTheme();
    const { data, setData, put, processing, errors, reset } = useForm({
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('register.complete.update', user.id), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <>
            <Head title="Completar Cadastro" />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: theme.palette.background.default, // opcional
                    padding: 2,
                }}
            >
                <CardProj
                    variant="outlined"
                    sx={{
                        maxWidth: '100%',
                        [theme.breakpoints.up('sm')]: { maxWidth: '650px' },
                    }}
                >
                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{
                            mb: 4,
                            fontWeight: 'bold',
                            color: theme.palette.primary.main,
                        }}
                    >
                        Completar Cadastro
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={submit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <TextField
                                label="Nome"
                                id="name"
                                name="name"
                                value={user.name}
                                disabled
                                fullWidth
                            />
                        </FormControl>

                        <FormControl>
                            <TextField
                                label="E-mail"
                                id="email"
                                type="email"
                                name="email"
                                value={user.email}
                                disabled
                                fullWidth
                            />
                        </FormControl>

                        <FormControl
                            variant="outlined"
                            error={!!errors.password}
                            fullWidth
                        >
                            <InputLabel htmlFor="password">Senha *</InputLabel>
                            <OutlinedInput
                                id="password"
                                name="password"
                                autoFocus
                                type={showPassword ? 'text' : 'password'}
                                placeholder="********"
                                value={data.password}
                                required
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Senha"
                            />
                            {errors.password && (
                                <FormHelperText>
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <PasswordStrengthMeter password={data.password} />

                        <FormControl
                            variant="outlined"
                            error={!!errors.password_confirmation}
                            fullWidth
                        >
                            <InputLabel htmlFor="password_confirmation">
                                Confirmar Senha *
                            </InputLabel>
                            <OutlinedInput
                                id="password_confirmation"
                                name="password_confirmation"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="********"
                                value={data.password_confirmation}
                                required
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirmação de Senha"
                            />
                            {errors.password_confirmation && (
                                <FormHelperText>
                                    {errors.password_confirmation}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <Box
                            sx={{
                                mt: 4,
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Box
                                component="button"
                                disabled={processing}
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    '&:disabled': {
                                        backgroundColor:
                                            theme.palette.action
                                                .disabledBackground,
                                        color: theme.palette.action.disabled,
                                        cursor: 'not-allowed',
                                    },
                                }}
                            >
                                Completar Cadastro
                            </Box>
                        </Box>
                    </Box>
                </CardProj>
            </Box>
        </>
    );
}

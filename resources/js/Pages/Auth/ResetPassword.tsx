import CardProj from '@/Components/CardProj';
import PasswordStrengthMeter from '@/Components/PasswordStrenghMeter';
import RedefinitionPasswordTimer from '@/Components/RedefinitionPasswordTimer';
import { useAppTheme } from '@/Hooks/useAppTheme';
import Layout from '@/Layouts/Layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Alert,
    Box,
    CircularProgress,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import React, { FormEventHandler, useEffect, useState } from 'react';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const [currentTheme, toggleCurrentTheme] = useAppTheme();
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [tokenValid, setTokenValid] = useState<boolean | null>(null);

    useEffect(() => {
        // Check if the token is valid
        // Checar rota 30/01/2025
        setTokenValid(token !== '');
    }, [token]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    if (tokenValid === null) {
        return (
            <Layout>
                <Head title="Resetar Senha" />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <CircularProgress />
                </Box>
            </Layout>
        );
    }

    if (!tokenValid) {
        return (
            <Layout>
                <Head title="Resetar Senha" />
                <CardProj
                    variant="outlined"
                    sx={{
                        maxWidth: '100%',
                        [currentTheme.breakpoints.up('sm')]: {
                            maxWidth: '650px',
                        },
                    }}
                >
                    <Alert severity="error">
                        Token expirado. Por favor, solicite um novo link de
                        redefinição de senha.
                    </Alert>
                    <Box
                        sx={{
                            mt: 4,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                    >
                        <Link
                            href={route('login')}
                            style={{
                                textDecoration: 'none',
                                color: currentTheme.palette.text.secondary,
                                marginRight: '16px',
                            }}
                        >
                            Voltar para o Login
                        </Link>
                    </Box>
                </CardProj>
            </Layout>
        );
    }

    return (
        <Layout>
            <Head title="Resetar Senha" />

            <CardProj
                variant="outlined"
                sx={{
                    maxWidth: '100%',
                    [currentTheme.breakpoints.up('sm')]: { maxWidth: '650px' },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 4,
                    }}
                >
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            color: currentTheme.palette.primary.main,
                        }}
                    >
                        Resetar Senha
                    </Typography>
                    {tokenValid && (
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                color: currentTheme.palette.primary.main,
                            }}
                        >
                            <RedefinitionPasswordTimer />
                        </Typography>
                    )}
                </Box>

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
                            label="E-mail"
                            error={!!errors.email}
                            helperText={errors.email}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="seu@email.com"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            required
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setData('email', e.target.value)}
                            color={errors.email ? 'error' : 'primary'}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        />
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        error={!!errors.password}
                        fullWidth
                    >
                        <InputLabel htmlFor="password">Senha *</InputLabel>
                        <OutlinedInput
                            autoFocus
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={data.password}
                            required
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword
                                                ? 'hide the password'
                                                : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
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
                            label="Password"
                        />
                        {errors.password && (
                            <FormHelperText>{errors.password}</FormHelperText>
                        )}
                    </FormControl>

                    <PasswordStrengthMeter password={data.password} />

                    <FormControl
                        variant="outlined"
                        error={!!errors.password_confirmation}
                        fullWidth
                    >
                        <InputLabel htmlFor="password">
                            Confirmar Senha *
                        </InputLabel>
                        <OutlinedInput
                            id="password_confirmation"
                            name="password_confirmation"
                            type={showPassword ? 'text' : 'password'}
                            value={data.password_confirmation}
                            required
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword
                                                ? 'hide the password confirmation'
                                                : 'display the password confirmation'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
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
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            component="button"
                            disabled={processing}
                            sx={{
                                backgroundColor:
                                    currentTheme.palette.primary.main,
                                color: currentTheme.palette.primary
                                    .contrastText,
                                padding: '8px 16px',
                                borderRadius: '4px',
                                border: 'none',
                                cursor: 'pointer',
                                '&:disabled': {
                                    backgroundColor:
                                        currentTheme.palette.action
                                            .disabledBackground,
                                    color: currentTheme.palette.action.disabled,
                                    cursor: 'not-allowed',
                                },
                            }}
                        >
                            Resetar Senha
                        </Box>
                    </Box>
                </Box>
            </CardProj>
        </Layout>
    );
}

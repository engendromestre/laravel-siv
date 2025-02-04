import CardProj from '@/Components/CardProj';
import PasswordStrengthMeter from '@/Components/PasswordStrenghMeter';
import Layout from '@/Layouts/Layout';
import { Head, Link, useForm } from '@inertiajs/react';
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
    Typography
} from '@mui/material';
import React, { FormEventHandler } from 'react';

import { Theme } from '@mui/material/styles';

export default function Register({ theme }: { theme: Theme }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const [showPassword, setShowPassword] = React.useState(false);

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

    return (
        <Layout>
            <Head title="Register" />

            <CardProj
                variant="outlined"
                sx={{
                    maxWidth: '100%',
                    [theme.breakpoints.up('sm')]: { maxWidth: '650px' },
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        mb: 4,
                        fontWeight: 'bold',
                        color: theme.palette.primary.main,
                    }}
                >
                    Registro
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
                            label="Nome Completo"
                            error={!!errors.name}
                            helperText={errors.name}
                            id="name"
                            name="name"
                            placeholder="Seu Nome"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            required
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setData('name', e.target.value)}
                            color={errors.name ? 'error' : 'primary'}
                        />
                    </FormControl>
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
                            label="Senha"
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
                            placeholder="********"
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
                        <Link
                            href={route('login')}
                            style={{
                                textDecoration: 'none',
                                color: theme.palette.text.secondary,
                                marginRight: '16px',
                            }}
                        >
                            Já registrado?
                        </Link>

                        <Box
                            component="button"
                            disabled={processing}
                            sx={{
                                backgroundColor:
                                    theme.palette.primary.main,
                                color: theme.palette.primary
                                    .contrastText,
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
                            Registrar
                        </Box>
                    </Box>
                </Box>
            </CardProj>
        </Layout>
    );
}

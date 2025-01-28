import CardProj from '@/Components/CardProj';
import { useAppTheme } from '@/Hooks/useAppTheme';
import Layout from '@/Layouts/Layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from '@mui/material';
import React, { FormEventHandler } from 'react';

export default function Register() {
    const [currentTheme, toggleCurrentTheme] = useAppTheme();
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
                    [currentTheme.breakpoints.up('sm')]: { maxWidth: '650px' },
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        mb: 4,
                        fontWeight: 'bold',
                        color: currentTheme.palette.primary.main,
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
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="password" error={!!errors.password}>Senha *</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={data.password}
                            required
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            error={!!errors.password}
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
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="password_confirmation">
                            Confirme a Senha *
                        </InputLabel>
                        <OutlinedInput
                            id="password_confirmation"
                            type={showPassword ? 'text' : 'password'}
                            value={data.password_confirmation}
                            required
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            error={!!errors.password_confirmation}
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
                            label="Confirme a Senha"
                        />
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
                                color: currentTheme.palette.text.secondary,
                                marginRight: '16px',
                            }}
                        >
                            Já registrado?
                        </Link>

                        <Box component="button" disabled={processing} sx={{
                            backgroundColor: currentTheme.palette.primary.main,
                            color: currentTheme.palette.primary.contrastText,
                            padding: '8px 16px',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            '&:disabled': {
                                backgroundColor: currentTheme.palette.action.disabledBackground,
                                color: currentTheme.palette.action.disabled,
                                cursor: 'not-allowed',
                            },
                        }}>
                            Registrar
                        </Box>
                    </Box>
                </Box>
            </CardProj>

            {/* <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form> */}
        </Layout>
    );
}

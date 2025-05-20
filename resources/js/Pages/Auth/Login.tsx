import CardProj from '@/Components/CardProj';
import Checkbox from '@/Components/Checkbox';
import { GoogleIcon } from '@/Components/CustonIcons';
import InContainer from '@/Components/InContainer';
import SideCustomLive from '@/Components/SideCustomLive';
import Layout from '@/Layouts/Layout';
import { Head, Link as InertiaLink, useForm } from '@inertiajs/react';
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Link as MuiLink,
    TextField,
    Typography,
} from '@mui/material';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <Layout>
            <Head title="Log in" />
            <SideCustomLive />
            <InContainer>
                <CardProj variant="outlined">
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            mb: 4,
                            fontWeight: 'bold',
                        }}
                    >
                        Login
                    </Typography>
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

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
                            <FormLabel htmlFor="email">E-mail</FormLabel>
                            <TextField
                                error={!!errors.email}
                                helperText={errors.email}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="seu@email.com"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                color={errors.email ? 'error' : 'primary'}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="password">Senha</FormLabel>
                            <TextField
                                error={!!errors.password}
                                helperText={errors.password}
                                id="password"
                                type="password"
                                name="password"
                                placeholder="••••••"
                                value={data.password}
                                required
                                fullWidth
                                variant="outlined"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                color={errors.password ? 'error' : 'primary'}
                            />
                        </FormControl>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                    color="primary"
                                />
                            }
                            label="Lembrar-me"
                            sx={{
                                '& .MuiTypography-root': {
                                    marginLeft: '8px',
                                },
                            }}
                            labelPlacement="end"
                        />

                        <MuiLink
                            href={route('password.request')}
                            component={InertiaLink}
                            variant="body2"
                            sx={{ alignSelf: 'center' }}
                        >
                            Esqueceu a senha?
                        </MuiLink>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={processing}
                        >
                            Entrar
                        </Button>
                    </Box>
                    <Divider>ou</Divider>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => {
                                window.location.href = route(
                                    'social.redirect',
                                    {
                                        provider: 'google',
                                    },
                                );
                            }}
                            startIcon={<GoogleIcon />}
                        >
                            Entrar com Google
                        </Button>
                    </Box>
                </CardProj>
            </InContainer>
        </Layout>
    );
}

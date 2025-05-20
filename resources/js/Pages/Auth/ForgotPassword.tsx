import CardProj from '@/Components/CardProj';
import InContainer from '@/Components/InContainer';
import SideCustomLive from '@/Components/SideCustomLive';
import Layout from '@/Layouts/Layout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Box,
    FormControl,
    FormLabel,
    TextField,
    Typography,
} from '@mui/material';
import { FormEventHandler } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'), {
            onSuccess: () => {
                alert('Email de recuperação enviado com sucesso!');
                window.location.href = route('login');
            },
            onError: () => {
                console.error(
                    'Ocorreu um erro ao enviar o email de recuperação.',
                );
            },
        });
    };

    return (
        <Layout>
            <Head title="Forgot Password" />
            <SideCustomLive />
            <InContainer>
                <CardProj variant="outlined">
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={(theme) => ({
                            fontWeight: 'bold',
                            color: theme.vars.palette.primary.main,
                            ml: 2,
                        })}
                    >
                        Recuperar senha
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={submit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: '100%',
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
                                    // color: currentTheme.palette.text.secondary,
                                    marginRight: '16px',
                                }}
                            >
                                Voltar para o Login
                            </Link>

                            <Box
                                component="button"
                                disabled={processing}
                                sx={(theme) => ({
                                    backgroundColor:
                                        theme.vars.palette.primary.main,
                                    color: theme.vars.palette.primary
                                        .contrastText,
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    '&:disabled': {
                                        backgroundColor:
                                            theme.vars.palette.action
                                                .disabledBackground,
                                        color: theme.vars.palette.action
                                            .disabled,
                                        cursor: 'not-allowed',
                                    },
                                })}
                            >
                                Enviar
                            </Box>
                        </Box>
                    </Box>
                </CardProj>
            </InContainer>
        </Layout>
    );
}

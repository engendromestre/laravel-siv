import CardProj from '@/Components/CardProj';
import Layout from '@/Layouts/Layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Alert, Box, Typography } from '@mui/material';
import { FormEventHandler } from 'react';
import { useTheme } from '@mui/material/styles';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});
    const currentTheme = useTheme();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <Layout>
            <Head title="Verificação de E-mail" />
            <CardProj variant="outlined">
                <Typography
                    variant="body2"
                    color="textSecondary"
                    className="mb-4"
                >
                    Obrigado por se inscrever! Antes de começar, você poderia
                    verificar seu endereço de e-mail clicando no link que
                    acabamos de enviar para você? Se você não recebeu o e-mail,
                    nós enviaremos outro com prazer.
                </Typography>

                {status === 'verification-link-sent' && (
                    <Alert severity="info">
                        Um novo link de verificação foi enviado para o endereço
                        de e-mail que você forneceu durante o registro.
                    </Alert>
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
                    <Box
                        sx={{
                            mt: 4,
                            display: 'flex',
                            justifyContent: 'space-between',
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
                           Sair
                        </Link>

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
                            Reenviar E-mail de Verificação
                        </Box>
                    </Box>
                </Box>
            </CardProj>
        </Layout>
    );
}

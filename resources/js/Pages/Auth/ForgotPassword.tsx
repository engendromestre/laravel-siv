import CardProj from '@/Components/CardProj';
import { useAppTheme } from '@/Hooks/useAppTheme';
import Layout from '@/Layouts/Layout';
import { Head, useForm, Link } from '@inertiajs/react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    TextField,
    Typography,
} from '@mui/material';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const [currentTheme, toggleCurrentTheme] = useAppTheme();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <Layout>
            <Head title="Forgot Password" />
            <CardProj variant="outlined">
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: currentTheme.palette.primary.main,
                        ml: 2,
                    }}
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
                            onChange={(e) => setData('email', e.target.value)}
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
                                color: currentTheme.palette.text.secondary,
                                marginRight: '16px',
                            }}
                        >
                            Voltar para o Login
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
                            Enviar
                        </Box>
                    </Box>
                </Box>
            </CardProj>
        </Layout>
    );
}

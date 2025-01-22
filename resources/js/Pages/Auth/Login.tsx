import Checkbox from '@/Components/Checkbox';
import { GoogleIcon, MicrosoftIcon } from '@/Components/CustonIcons';
import Layout from '@/Layouts/Layout';
import { Head, Link as InertiaLink, useForm } from '@inertiajs/react';
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Card as MuiCard,
    Link as MuiLink,
    styled,
    TextField,
} from '@mui/material';
import { FormEventHandler } from 'react';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
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
            <Card variant="outlined">
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
                            // value={data.email}
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

                    <FormControl>
                        <FormLabel htmlFor="password">Senha</FormLabel>

                        <TextField
                            error={!!errors.password}
                            helperText={errors.password}
                            id="password"
                            type="password"
                            name="password"
                            placeholder="••••••"
                            // value={data.password}
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
                        control={<Checkbox value="remember" color="primary" />}
                        label="Lembrar-me"
                        sx={{
                            '& .MuiTypography-root': {
                                marginLeft: '8px', // Define um espaçamento explícito entre a caixa e o texto
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
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => alert('Entrar com Google')}
                        startIcon={<GoogleIcon />}
                    >
                        Entrar com Google
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => alert('Entrar com Microsoft')}
                        startIcon={<MicrosoftIcon />}
                    >
                        Entrar com Microsoft
                    </Button>
                </Box>
            </Card>
        </Layout>
    );
}
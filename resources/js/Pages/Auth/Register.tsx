import CardProj from '@/Components/CardProj';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import {
    Box,
    FormControl,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { FormEventHandler } from 'react';

const breadcrumb = [
    { label: 'Dashboard', icon: HomeIcon, href: 'dashboard' },
    { label: 'Usuário', icon: PersonAddIcon },
];

export default function Register() {
    const theme = useTheme();
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <AuthenticatedLayout header={breadcrumb}>
            <Head title="Registrar Usuário" />
            <Typography
                variant="h5"
                gutterBottom
                sx={{
                    mb: 4,
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                }}
            >
                Registrar Usuário
            </Typography>
            <CardProj
                variant="outlined"
                sx={{
                    maxWidth: '100%',
                    [theme.breakpoints.up('sm')]: { maxWidth: '650px' },
                }}
            >
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
                            autoFocus
                            label="Nome Completo do Usuário"
                            error={!!errors.name}
                            helperText={errors.name}
                            id="name"
                            name="name"
                            placeholder="Seu Nome Completo"
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
                            label="E-mail do Usuário"
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
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                padding: '8px 16px',
                                borderRadius: '4px',
                                border: 'none',
                                cursor: 'pointer',
                                '&:disabled': {
                                    backgroundColor:
                                        theme.palette.action.disabledBackground,
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
        </AuthenticatedLayout>
    );
}

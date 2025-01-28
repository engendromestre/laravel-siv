import CardProj from '@/Components/CardProj';
import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    TextField,
    Typography,
} from '@mui/material';
import { FormEventHandler } from 'react';
import { useAppTheme } from '../../../hooks/useAppTheme';

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
                        mb: 4,
                        fontWeight: 'bold',
                        color: currentTheme.palette.primary.main,
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
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={processing}
                        >
                            Enviar
                        </Button>
                    </Box>
                </Box>
            </CardProj>
        </Layout>
    );
}

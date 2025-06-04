import ButtonForm from '@/Components/ButtonForm';
import CardProj from '@/Components/CardProj';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Box, FormControl, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { FormEventHandler } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const user = usePage().props.auth.user;
    const theme = useTheme();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, setData, patch, errors, processing } = useForm<{
        name: string;
        email: string;
    }>({
        name: user.name,
        email: user.email,
    });

    const { enqueueSnackbar } = useSnackbar();
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            onSuccess: () => {
                enqueueSnackbar('Perfil atualizado com sucesso!', {
                    variant: 'success',
                });
            },
            onError: () => {
                enqueueSnackbar('Erro ao atualizar o perfil!', {
                    variant: 'error',
                });
            },
        });
    };

    return (
        <CardProj variant="outlined">
            <Typography
                component="p"
                variant="body1"
                gutterBottom
                sx={{
                    mb: 4,
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                }}
            >
                Atualize as informações do perfil e o endereço de e-mail da sua
                conta.
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
                        onChange={(e) =>
                            setData('name', e.target.value as never)
                        }
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

                {mustVerifyEmail && user.email_verified_at === null && (
                    <Box>
                        <Typography
                            variant="body2"
                            sx={{ mt: 2, color: 'text.primary' }}
                        >
                            Seu endereço de e-mail não está verificado.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Clique aqui para reenviar o e-mail de
                                verificação.
                            </Link>
                        </Typography>

                        {status === 'verification-link-sent' && (
                            <Typography
                                variant="body2"
                                sx={{
                                    mt: 2,
                                    fontWeight: 'medium',
                                    color: 'success.main',
                                }}
                            >
                                Um novo link de verificação foi enviado para o
                                seu endereço de e-mail.
                            </Typography>
                        )}
                    </Box>
                )}

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <ButtonForm disabled={processing}>Salvar</ButtonForm>
                </Box>
            </Box>
        </CardProj>
    );
}

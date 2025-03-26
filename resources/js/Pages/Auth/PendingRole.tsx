// resources/js/Pages/Auth/PendingRole.tsx
import { ClockIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';
import { Head, router } from '@inertiajs/react';
import {
    Box,
    Button,
    Container,
    Divider,
    Paper,
    Typography,
} from '@mui/material';

export default function PendingRole() {
    return (
        <>
            <Head title="Aguardando Permissão" />

            <Box className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
                <Container maxWidth="md">
                    <Paper
                        elevation={3}
                        className="rounded-xl p-6 sm:p-8 md:p-10"
                        sx={{
                            background:
                                'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                            border: '1px solid #e2e8f0',
                        }}
                    >
                        <Box className="text-center">
                            {/* Ícone principal */}
                            <Box className="mb-6 flex justify-center">
                                <ClockIcon className="h-16 w-16 text-blue-500" />
                            </Box>

                            {/* Título */}
                            <Typography
                                variant="h4"
                                component="h1"
                                className="mb-4 font-bold text-gray-800"
                            >
                                Cadastro Realizado!
                            </Typography>

                            {/* Mensagem principal */}
                            <Typography
                                variant="body1"
                                className="mx-auto mb-6 max-w-2xl text-gray-600"
                            >
                                Seu cadastro foi registrado com sucesso em nosso
                                sistema. No momento, estamos aguardando a
                                definição de sua função pelo administrador.
                            </Typography>

                            {/* Card de informação */}
                            <Box className="mb-8 rounded-lg bg-blue-50 p-6">
                                <Box className="mb-3 flex items-center justify-center">
                                    <EnvelopeIcon className="mr-2 h-6 w-6 text-blue-500" />
                                    <Typography
                                        variant="h6"
                                        className="font-semibold text-blue-700"
                                    >
                                        Fique atento ao seu e-mail
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body2"
                                    className="text-gray-600"
                                >
                                    Assim que sua função for definida, você
                                    receberá uma notificação por e-mail com mais
                                    instruções para acessar o sistema.
                                </Typography>
                            </Box>

                            {/* Divider */}
                            <Divider className="mb-6" />

                            {/* Informações adicionais */}
                            <Box className="mb-6 flex items-center justify-center text-gray-500">
                                <UserIcon className="mr-2 h-5 w-5" />
                                <Typography variant="body2">
                                    Dúvidas? Entre em contato com o
                                    administrador do sistema
                                </Typography>
                            </Box>

                            {/* Botão de logout (opcional) */}
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    router.post(route('logout'));
                                }}
                                className="mt-4"
                                sx={{
                                    borderRadius: '9999px',
                                    textTransform: 'none',
                                    px: 6,
                                    py: 1.5,
                                    '&:hover': {
                                        backgroundColor: '#dbeafe',
                                    },
                                }}
                            >
                                Sair do Sistema
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>
    );
}

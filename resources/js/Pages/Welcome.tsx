import { Head, router } from '@inertiajs/react';
import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Typography,
} from '@mui/material';

export default function Welcome() {
    const handleLoginRedirect = () => {
        router.visit(route('login')); // redireciona para a rota de login do Laravel
    };

    return (
        <>
            <Head title="Sistema de Identificação do Paciente" />

            <Box
                sx={{
                    minHeight: '100vh',
                    background:
                        'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#fff',
                }}
            >
                <Container maxWidth="md">
                    <Paper
                        elevation={8}
                        sx={{
                            p: 6,
                            borderRadius: 4,
                            backdropFilter: 'blur(6px)',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'white',
                        }}
                    >
                        <Typography variant="h3" fontWeight="bold" gutterBottom>
                            Sistema de Identificação do Paciente
                        </Typography>

                        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                            Gerencie com segurança e eficiência as informações
                            dos pacientes.
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button
                                variant="contained"
                                onClick={handleLoginRedirect}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    backgroundColor: '#ff9800',
                                    '&:hover': {
                                        backgroundColor: '#fb8c00',
                                    },
                                }}
                            >
                                Acessar Login
                            </Button>
                        </Stack>
                    </Paper>

                    <Typography variant="body2" sx={{ mt: 6, opacity: 0.7 }}>
                        © {new Date().getFullYear()} Sistema de Identificação
                        do Paciente • Todos os direitos reservados
                    </Typography>
                </Container>
            </Box>
        </>
    );
}

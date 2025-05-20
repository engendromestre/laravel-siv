import CardProj from '@/Components/CardProj';
import InContainer from '@/Components/InContainer';
import SideCustomLive from '@/Components/SideCustomLive';
import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Button, Link, Typography } from '@mui/material';

export default function ErrorPage({
    status,
}: {
    status: 403 | 404 | 500 | 503;
}) {
    const title = {
        503: '503: Serviço Indisponível',
        500: '500: Erro no Servidor',
        404: '404: Página Não Encontrada',
        403: '403: Acesso Negado',
    }[status];

    const description = {
        503: 'Desculpe, estamos em manutenção. Por favor, tente novamente em breve.',
        500: 'Ops! Algo deu errado nos nossos servidores.',
        404: 'A página que você procura não foi encontrada.',
        403: 'Você não tem permissão para acessar esta página.',
    }[status];

    return (
        <Layout>
            <Head title={`Erro: ${status}`} />
            <SideCustomLive />
            <InContainer>
                <CardProj variant="outlined">
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="60vh"
                        textAlign="center"
                        gap={2}
                    >
                        <ErrorIcon sx={{ fontSize: 100, color: '#f44336' }} />
                        <Typography
                            variant="h4"
                            component="h1"
                            color="text.primary"
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            maxWidth={400}
                        >
                            {description}
                        </Typography>
                        <Button
                            component={Link}
                            href={route('dashboard')}
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Voltar para o Dashboard
                        </Button>
                    </Box>
                </CardProj>
            </InContainer>
        </Layout>
    );
}

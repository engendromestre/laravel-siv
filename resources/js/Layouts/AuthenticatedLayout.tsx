// resources/js/Layouts/AuthenticatedLayout.tsx
import AppNavbar from '@/Components/AppNavBar';
import Header from '@/Components/Header';
import SideMenu from '@/Components/SideMenu';
import IdleWarning from '@/Internals/Components/IdleWarning';
import { alpha, Box, Stack } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { PropsWithChildren, ReactNode } from 'react';
import Layout from './Layout';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    return (
        <SnackbarProvider
            autoHideDuration={2000}
            maxSnack={3}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Layout>
                <Box sx={{ display: 'flex' }}>
                    <SideMenu />
                    <AppNavbar />
                    <Box
                        component="main"
                        sx={(theme) => ({
                            flexGrow: 1,
                            backgroundColor: theme.vars
                                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                                : alpha(theme.palette.background.default, 1),
                            overflow: 'auto',
                        })}
                    >
                        <Stack
                            spacing={2}
                            sx={{
                                alignItems: 'center',
                                mx: 3,
                                pb: 5,
                                mt: { xs: 8, md: 0 },
                            }}
                        >
                            <Header header={header} />
                            <main>{children}</main>
                            <IdleWarning />
                        </Stack>
                    </Box>
                </Box>
            </Layout>
        </SnackbarProvider>
    );
}

import { Header } from '@/Components/Header';
import {
    AppBar,
    Box,
    Container,
    CssBaseline,
    Stack,
    styled,
    ThemeProvider,
} from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { useState } from 'react';
import { useAppTheme } from '../../hooks/useAppTheme';

const drawerWidth = 0;

export default function Layout({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [currentTheme, toggleCurrentTheme] = useAppTheme();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const InContainer = styled(Stack)(({ theme }) => ({
        height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
        minHeight: '100%',
        padding: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(4),
        },
        '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            zIndex: -1,
            inset: 0,
            backgroundImage:
                'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
            backgroundRepeat: 'no-repeat',
            ...theme.applyStyles('dark', {
                backgroundImage:
                    'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
            }),
        },
    }));

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <InContainer direction="column" justifyContent="space-between">
                <Box sx={{ display: 'flex' }}>
                    <AppBar
                        position="fixed"
                        sx={{
                            width: { sm: `calc(100% - ${drawerWidth}px)` },
                            ml: { sm: `${drawerWidth}px` },
                        }}
                    >
                        <Header
                            handleDrawerToggle={handleDrawerToggle}
                            toggle={toggleCurrentTheme}
                            theme={
                                currentTheme.palette.mode === 'dark'
                                    ? 'dark'
                                    : 'light'
                            }
                        />
                    </AppBar>

                    <SnackbarProvider
                        autoHideDuration={2000}
                        maxSnack={3}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <Container
                            maxWidth="lg"
                            sx={{ color: 'white', my: 12 }}
                        >
                            {children}
                        </Container>
                    </SnackbarProvider>
                </Box>
            </InContainer>
        </ThemeProvider>
    );
}
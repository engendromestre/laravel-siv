import AppTheme from '@/theme/AppTheme';
import { CssBaseline } from '@mui/material';

export default function Layout(
    { children }: { children: React.ReactNode },
    props: { disableCustomTheme?: boolean },
) {
    return (
        <AppTheme {...props}>
            <CssBaseline />
            {children}
        </AppTheme>
    );
}

import ColorModeIconDropdown from '@/theme/ColorModelIconDropdown';
import Stack from '@mui/material/Stack';
import { PropsWithChildren } from 'react';
import NavbarBreadcrumbs, { BreadcrumbItem } from './NavbarBreadcrumbs';

export default function Header({
    header,
}: PropsWithChildren<{
    header?: Array<Record<string, unknown>>;
}>): JSX.Element {
    return (
        <Stack
            direction="row"
            sx={{
                display: { xs: 'none', md: 'flex' },
                width: '100%',
                alignItems: { xs: 'flex-start', md: 'center' },
                justifyContent: 'space-between',
                maxWidth: { sm: '100%', md: '1700px' },
                pt: 1.5,
            }}
            spacing={2}
        >
            <NavbarBreadcrumbs
                header={header as BreadcrumbItem[] | undefined}
            />
            <Stack direction="row" sx={{ gap: 1 }}>
                {/* <Search /> */}
                {/* <CustomDatePicker /> */}
                {/* <MenuButton showBadge aria-label="Open notifications">
                    <NotificationsRoundedIcon />
                </MenuButton> */}
                <ColorModeIconDropdown />
            </Stack>
        </Stack>
    );
}

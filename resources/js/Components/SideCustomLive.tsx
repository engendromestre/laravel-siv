import ColorModeIconDropdown from '@/theme/ColorModelIconDropdown';
import SettingsIcon from '@mui/icons-material/Settings';
import { Drawer, IconButton } from '@mui/material';
import { Stack, styled } from '@mui/system';
import { useState } from 'react';

const RotatingIconButton = styled(IconButton)({
    '&:hover': {
        transform: 'rotate(360deg)',
        transition: 'transform 0.5s ease-in-out',
    },
});

const SideCustomLive = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleToggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div
            style={{
                position: 'fixed',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
            }}
        >
            <RotatingIconButton
                color="primary"
                aria-label="settings"
                onClick={handleToggleDrawer}
            >
                <SettingsIcon />
            </RotatingIconButton>
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={handleToggleDrawer}
            >
                <Stack
                    sx={{
                        maxWidth: '90dvw',
                        height: '100%',
                    }}
                >
                    <ColorModeIconDropdown />
                </Stack>
            </Drawer>
        </div>
    );
};

export default SideCustomLive;

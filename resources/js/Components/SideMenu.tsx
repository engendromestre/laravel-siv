import { usePage } from '@inertiajs/react';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { CAISIcon } from './CustonIcons';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';

const drawerWidth = 240;
const drawerCollapsedWidth = 60;

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: open ? drawerWidth : drawerCollapsedWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard,
    }),
    [`& .${drawerClasses.paper}`]: {
        width: open ? drawerWidth : drawerCollapsedWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
        }),
        overflowX: 'hidden',
    },
}));

export default function SideMenu() {
    const user = usePage().props.auth.user;
    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Drawer
            open={open}
            variant="permanent"
            sx={{
                display: { xs: 'none', md: 'block' },
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: 'background.paper',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: open ? 'space-between' : 'center',
                    mt: 'calc(var(--template-frame-height, 0px) + 4px)',
                    p: 1.5,
                }}
            >
                {open && <CAISIcon />}
                <IconButton color="inherit" onClick={toggleDrawer}>
                    <MenuIcon />
                </IconButton>
            </Box>

            <Divider />

            {/* Conteúdo do menu */}
            <Box
                sx={{
                    overflow: 'auto',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <MenuContent open={open} />
            </Box>

            {/* Rodapé com usuário */}
            <Stack
                direction="row"
                sx={{
                    p: 2,
                    gap: 1,
                    alignItems: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    justifyContent: open ? 'flex-start' : 'center',
                }}
            >
                <Tooltip title={!open ? user.name : ''} placement="right">
                    <Avatar
                        sizes="small"
                        alt={user.name}
                        src="#"
                        sx={{ width: 36, height: 36 }}
                    />
                </Tooltip>

                {open && (
                    <Box
                        sx={{
                            flexGrow: 1,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                            }}
                        >
                            {user.name}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'text.secondary',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                            }}
                        >
                            {user.email}
                        </Typography>
                    </Box>
                )}

                {open && <OptionsMenu />}
            </Stack>
        </Drawer>
    );
}

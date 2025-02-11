import { Link as InertiaLink } from '@inertiajs/react';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

const mainListItems = [
    { text: 'Início', icon: HomeRoundedIcon, link: '/dashboard' },
    { text: 'Pacientes', icon: PeopleRoundedIcon },
    { text: 'Tasks', icon: AssignmentRoundedIcon },
];

const secondaryListItems = [
    { text: 'Configurações', icon: SettingsRoundedIcon },
    { text: 'Sobre', icon: InfoRoundedIcon },
    // { text: 'Feedback', icon: HelpRoundedIcon },
];

interface MenuContentProps {
    open: boolean;
}

export default function MenuContent({ open }: MenuContentProps) {
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: 'block' }}
                    >
                        <Tooltip
                            title={!open ? item.text : ''}
                            placement="right"
                        >
                            <InertiaLink href={item.link || '#'}>
                                <ListItemButton
                                    selected={index === 0}
                                    sx={{
                                        justifyContent: open
                                            ? 'initial'
                                            : 'center',
                                        px: open ? 2.5 : 1.5,
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            justifyContent: 'center',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <item.icon
                                            sx={{ fontSize: open ? 24 : 36 }}
                                        />
                                    </ListItemIcon>
                                    {open && (
                                        <ListItemText primary={item.text} />
                                    )}
                                </ListItemButton>
                            </InertiaLink>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: 'block' }}
                    >
                        <Tooltip
                            title={!open ? item.text : ''}
                            placement="right"
                        >
                            <ListItemButton
                                sx={{
                                    justifyContent: open ? 'initial' : 'center',
                                    px: open ? 2.5 : 1.5,
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <item.icon
                                        sx={{ fontSize: open ? 24 : 36 }}
                                    />
                                </ListItemIcon>
                                {open && <ListItemText primary={item.text} />}
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}

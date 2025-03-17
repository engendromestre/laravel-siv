import { Link as InertiaLink, usePage } from '@inertiajs/react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

const mainListItems = [
    {
        text: 'Início',
        icon: HomeRoundedIcon,
        link: route('dashboard'),
    },
    {
        text: 'Admitir Pacientes',
        icon: SupervisorAccountIcon,
        link: route('admission.index'),
    },
    {
        text: 'Listar Admitidos',
        icon: RecentActorsIcon,
        link: route('admissions.list'),
    },
    {
        text: 'Cadastrar Pacientes',
        icon: PeopleRoundedIcon,
        link: route('patient.index'),
    },
];

const secondaryListItems = [
    // { text: 'Configurações', icon: SettingsRoundedIcon },
    { text: 'Sobre', icon: InfoRoundedIcon },
    // { text: 'Feedback', icon: HelpRoundedIcon },
];

interface MenuContentProps {
    open: boolean;
}

export default function MenuContent({ open }: MenuContentProps) {
    const { url } = usePage();

    const getPathFromUrl = (link: string | undefined) => {
        if (!link) return ''; // Retorna uma string vazia se o link for undefined
        try {
            const urlObj = new URL(link);
            return urlObj.pathname;
        } catch (error) {
            return link;
        }
    };

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
                                    selected={
                                        getPathFromUrl(url) ===
                                        getPathFromUrl(item.link)
                                    }
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

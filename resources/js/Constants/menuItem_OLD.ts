// resources/js/menuItems.ts
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export const mainListItems2 = [
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

export const secondaryListItems2 = [
    {
        text: 'Papéis e Permissões',
        icon: VerifiedUserIcon,
        subItems: [
            {
                text: 'Cadastrar Usuário',
                icon: PeopleRoundedIcon,
                link: route('register'),
            },
        ],
    },
];

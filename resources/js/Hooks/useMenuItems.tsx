import { usePage } from '@inertiajs/react';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export const useMenuItems = () => {
    const { auth } = usePage().props;

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
        {
            text: 'Papéis e Permissões',
            icon: VerifiedUserIcon,
            subItems: [
                {
                    text: 'Cadastrar Usuário',
                    icon: PersonAddIcon,
                    link: route('register'),
                    roles: auth.user['roles'],
                },
                {
                    text: 'Papel',
                    icon: AssignmentIndIcon,
                    link: route('role.index'),
                    roles: auth.user['roles'],
                },
            ],
        },
    ];

    return { mainListItems, secondaryListItems };
};

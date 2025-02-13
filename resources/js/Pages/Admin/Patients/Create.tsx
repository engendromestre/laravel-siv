import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const breadcrumb = [
    { label: 'Dashboard', icon: HomeIcon, href: 'dashboard' },
    { label: 'Paciente', icon: PeopleIcon, href: 'patient.index' },
    { label: 'Novo Paciente', icon: PersonAddIcon },
];

export default function Create() {
    return (
        <AuthenticatedLayout header={breadcrumb}>
            <Head title="Criar Pacientes" />
        </AuthenticatedLayout>
    );
}

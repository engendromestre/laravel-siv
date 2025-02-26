import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FaUserEdit } from 'react-icons/fa';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

const breadcrumb = [
    { label: 'Dashboard', icon: HomeIcon, href: 'dashboard' },
    { label: 'Usuário', icon: PeopleIcon, href: 'patient.index' },
    { label: 'Editar Perfil', icon: FaUserEdit },
];

export default function Edit({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mustVerifyEmail,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout header={breadcrumb}>
            <Head title="Perfil" />
            <Box sx={{ width: '58%', maxWidth: { sm: '90%', md: '1700px' } }}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 1 }}
                    columns={{ xs: 4, sm: 8, md: 6 }}
                >
                    <Grid size={{ xs: 12, md: 3 }}>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <UpdatePasswordForm />
                    </Grid>
                </Grid>
            </Box>
        </AuthenticatedLayout>
    );
}

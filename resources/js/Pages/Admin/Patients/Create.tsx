import UploadPhotoComponent from '@/Components/Upload/ UploadPhotoComponent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Grid2 as Grid } from '@mui/material';
import CreatePatientInformationForm from './Partials/CreatePatientInformationForm';

const breadcrumb = [
    { label: 'Dashboard', icon: HomeIcon, href: 'dashboard' },
    { label: 'Paciente', icon: PeopleIcon, href: 'patient.index' },
    { label: 'Novo Paciente', icon: PersonAddIcon },
];

export default function Create() {
    // const theme = useTheme();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            register: '',
            name: '',
            birthDate: '',
            motherName: '',
            status: '',
        });
    // const { enqueueSnackbar } = useSnackbar();
    return (
        <AuthenticatedLayout header={breadcrumb}>
            <Head title="Inserir Pacientes" />
            <Box sx={{ width: '58%', maxWidth: { sm: '90%', md: '1700px' } }}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 1 }}
                    columns={{ xs: 4, sm: 8, md: 6 }}
                >
                    <Grid size={{ xs: 12, md: 3 }}>
                        <UploadPhotoComponent />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <CreatePatientInformationForm mustVerifyEmail={false} />
                    </Grid>
                </Grid>
            </Box>
        </AuthenticatedLayout>
    );
}

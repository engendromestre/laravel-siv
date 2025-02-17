import CardProj from '@/Components/CardProj';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { PatientList } from '@/types/Patients';
import { Head } from '@inertiajs/react';
import { AddCircle } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import { Button, Stack, useTheme } from '@mui/material';
import PatientDatagrid from './Components/PatientDatagrid';

const breadcrumb = [
    { label: 'Dashboard', icon: HomeIcon, href: 'dashboard' },
    { label: 'Paciente', icon: PeopleIcon },
];

export default function Index({
    patientList,
    mustVerifyEmail,
    status,
}: PageProps<{
    patientList: PatientList;
    mustVerifyEmail: boolean;
    status?: string;
}>) {
    const theme = useTheme();
    return (
        <AuthenticatedLayout header={breadcrumb}>
            <Head title="Listar Pacientes" />
            <CardProj
                variant="outlined"
                sx={{
                    maxWidth: '100%',
                    [theme.breakpoints.up('sm')]: { maxWidth: '90%' },
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ pb: 2, justifyContent: 'flex-end' }}
                >
                    <Button
                        variant="contained"
                        href={route('patient.create')}
                        startIcon={<AddCircle />}
                    >
                        Novo Paciente
                    </Button>
                </Stack>
                <PatientDatagrid
                    patientList={patientList}
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                />
            </CardProj>
        </AuthenticatedLayout>
    );
}

import CardProj from '@/Components/CardProj';
import CustomizedDataGrid from '@/Components/CustomizedDataGrid';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { AddCircle } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import { Button, Stack, useTheme } from '@mui/material';

const breadcrumb = [
    { label: 'Dashboard', icon: HomeIcon, href: 'dashboard' },
    { label: 'Paciente', icon: PeopleIcon },
];

export default function Index() {
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
                <CustomizedDataGrid />
            </CardProj>
        </AuthenticatedLayout>
    );
}

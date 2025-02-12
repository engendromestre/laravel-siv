import CardProj from '@/Components/CardProj';
import CustomizedDataGrid from '@/Components/CustomizedDataGrid';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { AddCircle } from '@mui/icons-material';
import { Button, Stack, useTheme } from '@mui/material';

export default function Index() {
    const theme = useTheme();
    return (
        <AuthenticatedLayout header={<span> Listar Pacientes</span>}>
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
                        // href={route('admin.patients.create')}
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

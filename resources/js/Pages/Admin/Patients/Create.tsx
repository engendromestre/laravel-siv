import ButtonForm from '@/Components/ButtonForm';
import CardProj from '@/Components/CardProj';
import UploadPhoto from '@/Components/Upload/ UploadPhoto';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Grid2 as Grid } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { FormEventHandler, useEffect, useState } from 'react';
import CreatePatientInformationForm from './Partials/CreatePatientInformationForm';

const breadcrumb = [
    { label: 'Dashboard', icon: HomeIcon, href: 'dashboard' },
    { label: 'Paciente', icon: PeopleIcon, href: 'patient.index' },
    { label: 'Novo Paciente', icon: PersonAddIcon },
];

export default function Create() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, setData, post, errors, processing } = useForm({
        register: '',
        name: '',
        gender: '' as 'm' | 'f',
        motherName: '',
        birthDate: '',
        status: 'a' as 'a' | 'i',
        photo: null as File | null,
    });

    const [photo, setPhoto] = useState<File | null>(null);

    useEffect(() => {
        setData('photo', photo);
    }, [photo, setData]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('register', data.register);
        formData.append('name', data.name);
        formData.append('gender', data.gender);
        formData.append('motherName', data.motherName);
        formData.append('birthDate', data.birthDate);
        formData.append('status', data.status);
        if (data.photo) formData.append('photo', data.photo);

        post(route('patient.store'), {
            headers: { 'Content-Type': 'multipart/form-data' },
            forceFormData: true, // 📌 Obrigatório para Inertia.js enviar corretamente!
            onSuccess: () => {
                enqueueSnackbar('Paciente cadastrado com sucesso!', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    onExited: () => {
                        router.get(route('patient.index'));
                    },
                });
            },
            onError: () => {
                enqueueSnackbar('Paciente cadastrado com erro!', {
                    variant: 'error',
                });
            },
        });
    };
    return (
        <AuthenticatedLayout header={breadcrumb}>
            <Head title="Inserir Pacientes" />
            <Box component="form" onSubmit={submit} noValidate>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: { sm: '100%', md: '1700px' },
                    }}
                >
                    <Grid
                        container
                        spacing={2}
                        columns={12}
                        sx={{ mb: (theme) => theme.spacing(2) }}
                    >
                        <Grid size={{ xs: 12, lg: 5 }}>
                            <UploadPhoto
                                onImageChange={setPhoto}
                                errors={errors}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, lg: 7 }}>
                            <CardProj
                                variant="outlined"
                                sx={{ width: '100%', maxWidth: '800px' }}
                            >
                                {' '}
                                {/* Ajuste a largura aqui */}
                                <CreatePatientInformationForm
                                    errors={errors}
                                    data={data}
                                    setData={setData}
                                />
                                <ButtonForm disabled={processing}>
                                    Salvar
                                </ButtonForm>
                            </CardProj>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
}

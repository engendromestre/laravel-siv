import ButtonForm from '@/Components/ButtonForm';
import CardProj from '@/Components/CardProj';
import UploadPhoto from '@/Components/Upload/ UploadPhoto';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Grid2 as Grid } from '@mui/material';
import axios from 'axios';
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
        mother_name: '',
        birth_date: '',
        status: 'a' as 'a' | 'i',
        photoFile: null as File | null,
        photo: '',
    });

    const [photoFile, setPhotoFile] = useState<File | null>(null);

    useEffect(() => {
        setData('photoFile', photoFile);
    }, [photoFile, setData]);

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        if (!data.photoFile) {
            enqueueSnackbar('Selecione uma foto!', { variant: 'error' });
            return;
        }

        // Criar FormData para upload da foto
        const photoFormData = new FormData();
        photoFormData.append('photo', data.photoFile);

        try {
            const previousPhotoFile = data.photoFile;
            const uploadResponse = await axios.post(
                route('patient.uploadPhoto'),
                photoFormData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );
            const photoPath = uploadResponse.data.photoRelativePath;

            data.photo = photoPath;
            data.photoFile = null;

            post(route('patient.store'), {
                onSuccess: () => {
                    data.photoFile = null;
                    enqueueSnackbar('Paciente cadastrado com sucesso!', {
                        variant: 'success',
                        autoHideDuration: 1500,
                        onExited: () => {
                            router.get(route('patient.index'));
                        },
                    });
                },
                onError: (error) => {
                    console.log(error);
                    enqueueSnackbar('Erro ao cadastrar paciente!', {
                        variant: 'error',
                    });
                },
            });
            data.photoFile = previousPhotoFile;
        } catch (error) {
            enqueueSnackbar('Erro ao fazer upload da foto!', {
                variant: 'error',
            });
        }
    };
    return (
        <AuthenticatedLayout header={breadcrumb}>
            <Head title="Inserir Pacientes" />
            <Box
                component="form"
                onSubmit={submit}
                noValidate
                autoComplete="off"
                sx={{
                    width: '100%',
                    maxWidth: { sm: '100%', md: '1700px' },
                }}
            >
                <Grid
                    container
                    spacing={1}
                    justifyContent="center" // Centraliza os itens no Grid
                    alignItems="center" // Alinha verticalmente no centro
                >
                    <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
                        <UploadPhoto
                            onImageChange={setPhotoFile}
                            errors={errors}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
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
        </AuthenticatedLayout>
    );
}

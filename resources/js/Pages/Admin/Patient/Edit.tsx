import ButtonForm from '@/Components/ButtonForm';
import CardProj from '@/Components/CardProj';
import UploadPhoto from '@/Components/Upload/ UploadPhoto';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Patient } from '@/types/Patients';
import { Head, router, useForm } from '@inertiajs/react';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import { Box, Grid2 as Grid } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { FormEventHandler, useEffect, useState } from 'react';
import { LiaUserEditSolid } from 'react-icons/lia';
import UpdatePatientInformationForm from './Partials/UpdatePatientInformationForm';

const breadcrumb = [
    { label: 'Dashboard', icon: HomeIcon, href: 'dashboard' },
    { label: 'Paciente', icon: PeopleIcon, href: 'patient.index' },
    { label: 'Editar Paciente', icon: LiaUserEditSolid },
];

export default function Edit({ patient }: PageProps<{ patient: Patient }>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, setData, put, errors, processing } = useForm({
        id: patient.id,
        register: patient.register,
        name: patient.name,
        gender: patient.gender as 'm' | 'f',
        mother_name: patient.mother_name,
        birth_date: patient.birth_date,
        status: patient.status as 'a' | 'i',
        photoFile: null as File | null,
        photo: patient.photo,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

        if (!data.id) {
            enqueueSnackbar('Erro ao atualizar o paciente!', {
                variant: 'error',
            });
            return;
        }

        // Criar FormData para upload da foto
        const photoFormData = new FormData();
        photoFormData.append('photo', data.photoFile);
        photoFormData.append('id', data.id.toString());

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

            put(route('patient.update', data.id), {
                onSuccess: () => {
                    data.photoFile = null;
                    console.log(data);
                    enqueueSnackbar('Paciente atualizado com sucesso!', {
                        variant: 'success',
                        autoHideDuration: 1500,
                        onExited: () => {
                            router.get(route('patient.index'));
                        },
                    });
                },
                onError: (error) => {
                    console.log(error);
                    enqueueSnackbar('Erro ao atualizar o paciente!', {
                        variant: 'error',
                    });
                },
            });
            data.photoFile = previousPhotoFile;
        } catch (error) {
            console.error('Erro ao atualizar o paciente:', error);
            enqueueSnackbar('Erro ao fazer upload da foto!', {
                variant: 'error',
            });
        }
    };

    return (
        <AuthenticatedLayout header={breadcrumb}>
            <Head title="Editar Paciente" />
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
                            initialImage={patient.photo?.toString()}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                        <CardProj variant="outlined">
                            <UpdatePatientInformationForm
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

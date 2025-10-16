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
import { enqueueSnackbar } from 'notistack';
import { FormEventHandler, useState } from 'react';
import { LiaUserEditSolid } from 'react-icons/lia';
import UpdatePatientInformationForm from './Partials/UpdatePatientInformationForm';

const breadcrumb = [
    { label: 'Dashboard', icon: HomeIcon, href: 'dashboard' },
    { label: 'Paciente', icon: PeopleIcon, href: 'patient.index' },
    { label: 'Editar Paciente', icon: LiaUserEditSolid },
];

export default function Edit({ patient }: PageProps<{ patient: Patient }>) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const { data, setData, post, errors, processing, transform } = useForm({
        register: patient.register,
        name: patient.name,
        gender: patient.gender as 'm' | 'f',
        mother_name: patient.mother_name,
        birth_date: patient.birth_date,
        status: patient.status as 'a' | 'i',
        photo: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Usar transform para converter para FormData quando houver arquivo
        transform((data) => {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (key === 'photo') {
                    // Se há uma nova imagem, adiciona ao FormData, senão não envia
                    if (selectedImage) {
                        formData.append(key, selectedImage);
                    }
                } else {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    formData.append(key, data[key] as string);
                }
            });
            formData.append('_method', 'PUT');
            return formData;
        });

        post(route('patient.update', patient.id), {
            forceFormData: true, // Força o uso de FormData
            onSuccess: () => {
                setSelectedImage(null); // Limpa a imagem selecionada após sucesso
                enqueueSnackbar('Paciente atualizado com sucesso!', {
                    variant: 'success',
                    autoHideDuration: 2000,
                    onClose: () => {
                        router.get(route('patient.index'));
                    },
                });
            },
            onError: (error) => {
                console.error('Erro ao atualizar paciente:', error);
                enqueueSnackbar('Erro ao atualizar o paciente!', {
                    variant: 'error',
                });
            },
        });
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
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
                        <UploadPhoto
                            onImageChange={setSelectedImage}
                            errors={errors}
                            initialImage={patient.photo_url ?? ''}
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
                                {processing ? 'Salvando...' : 'Salvar'}
                            </ButtonForm>
                        </CardProj>
                    </Grid>
                </Grid>
            </Box>
        </AuthenticatedLayout>
    );
}

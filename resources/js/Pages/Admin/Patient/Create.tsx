import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { FormEventHandler, useEffect, useState } from 'react';
import CreatePatientForm from './Partials/CreatePatientForm';

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
        status: 'i' as 'a' | 'i',
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
            <CreatePatientForm
                data={data}
                setData={setData}
                errors={errors}
                setPhotoFile={setPhotoFile}
                processing={processing}
                submit={submit}
            />
        </AuthenticatedLayout>
    );
}

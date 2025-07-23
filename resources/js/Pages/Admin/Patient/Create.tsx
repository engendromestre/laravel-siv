import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { enqueueSnackbar } from 'notistack';
import { FormEventHandler } from 'react';
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
        photo: null as File | null,
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        if (!data.photo) {
            enqueueSnackbar('Selecione uma foto para o paciente!', {
                variant: 'error',
            });
        }
        post(route('patient.store'), {
            onSuccess: () => {
                enqueueSnackbar('Paciente criado com sucesso!', {
                    variant: 'success',
                });
                router.get(route('patient.index'));
            },
            onError: () => {
                enqueueSnackbar('Erro ao criar paciente!', {
                    variant: 'error',
                });
            },
        });
    };

    return (
        <AuthenticatedLayout header={breadcrumb}>
            <Head title="Inserir Pacientes" />
            <CreatePatientForm
                data={data}
                setData={setData}
                errors={errors}
                setPhoto={(file: File | null) => setData('photo', file)}
                processing={processing}
                submit={submit}
            />
        </AuthenticatedLayout>
    );
}

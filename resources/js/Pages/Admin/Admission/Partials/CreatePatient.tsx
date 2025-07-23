import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { enqueueSnackbar } from 'notistack';
import { FormEventHandler } from 'react';
import CreatePatientForm from '../../Patient/Partials/CreatePatientForm';

const breadcrumb = [
    { label: 'Dashboard', icon: HomeIcon, href: 'dashboard' },
    {
        label: 'Admimitir Paciente',
        icon: SupervisorAccountIcon,
        href: 'admission.index',
    },
    { label: 'Novo Paciente', icon: PersonAddIcon },
];

export default function CreatePatient() {
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

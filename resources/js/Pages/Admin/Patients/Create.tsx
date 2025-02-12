import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Create() {
    return (
        <AuthenticatedLayout header={<span> Criar Pacientes</span>}>
            <Head title="Criar Pacientes" />
        </AuthenticatedLayout>
    );
}

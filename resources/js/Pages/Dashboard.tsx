import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
        </AuthenticatedLayout>
    );
}

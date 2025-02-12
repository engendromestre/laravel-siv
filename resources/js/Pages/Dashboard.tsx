import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Dashboard(props: { disableCustomTheme?: boolean }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
        </AuthenticatedLayout>
    );
}

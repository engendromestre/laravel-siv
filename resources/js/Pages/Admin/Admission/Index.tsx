// Index.tsx
import { Head, router } from '@inertiajs/react';
import { Box, useTheme } from '@mui/material';
import { useState } from 'react';

import CardProj from '@/Components/CardProj';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

import { Patient } from '@/types/Patients';
import AdmissionFormCreate from './Components/AdmissionFormCreate';
import PatientList from './Components/PatientList';
import PatientSearch from './Components/PatientSearch';
import RegisterForm from './Components/RegisterForm';

const breadcrumb = [
    { label: 'Dashboard', icon: HomeIcon, href: 'dashboard' },
    { label: 'Admissão', icon: PeopleIcon },
];

export default function Index() {
    const theme = useTheme();

    const [patients, setPatients] = useState<Patient[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(
        null,
    );
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleSelectPatient = (patient: Patient) => {
        setSelectedPatient(patient);
        setSearchQuery(patient.name);
        setPatients([]);
    };

    const handleRegisterPatient = () => {
        router.get(route('admission.patient.create'));
    };

    return (
        <AuthenticatedLayout header={breadcrumb}>
            <Head title="Admitir Pacientes" />
            <CardProj
                variant="outlined"
                sx={{
                    maxWidth: '60%',
                    [theme.breakpoints.up('sm')]: { maxWidth: '50%' },
                }}
            >
                <Box>
                    <PatientSearch
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        setPatients={setPatients}
                        setShowRegisterForm={setShowRegisterForm}
                        setSelectedPatient={setSelectedPatient}
                    />
                    {patients.length > 0 && (
                        <PatientList
                            patients={patients}
                            handleSelectPatient={handleSelectPatient}
                        />
                    )}
                    {showRegisterForm && (
                        <RegisterForm
                            handleRegisterPatient={handleRegisterPatient}
                        />
                    )}
                </Box>
            </CardProj>

            {selectedPatient && !showRegisterForm && (
                <CardProj variant="outlined" sx={{ marginTop: 2 }}>
                    <AdmissionFormCreate selectedPatient={selectedPatient} />
                </CardProj>
            )}
        </AuthenticatedLayout>
    );
}

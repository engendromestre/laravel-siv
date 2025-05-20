import { Patient } from '@/types/Patients';
import React from 'react';
import PatientProfileCardInfo from './PatientProfileCardInfo';
import PatientProfileTableAdmissions from './PatientProfileTableAdmissions';

interface PatientProfileProps {
    patient: Patient;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patient }) => {
    return (
        <>
            <PatientProfileCardInfo patient={patient} />
            {patient.admissions && patient.admissions.length > 0 && (
                <PatientProfileTableAdmissions
                    admissions={patient.admissions}
                />
            )}
        </>
    );
};

export default PatientProfile;

// PatientSearch.tsx
import { Patient } from '@/types/Patients';
import { FormControl, TextField } from '@mui/material';
import axios from 'axios';
import React, { ChangeEvent } from 'react';

interface PatientSearchProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    setPatients: (patients: Patient[]) => void;
    setShowRegisterForm: (show: boolean) => void;
    setSelectedPatient: (patient: Patient | null) => void;
}

const PatientSearch: React.FC<PatientSearchProps> = ({
    searchQuery,
    setSearchQuery,
    setPatients,
    setShowRegisterForm,
    setSelectedPatient,
}) => {
    const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        const response = await axios.get('/patients', {
            params: {
                search: query,
                sortField: 'name',
                sortOrder: 'asc',
                perPage: 10,
            },
        });

        setPatients(response.data.data);

        if (response.data.data.length === 0) {
            setShowRegisterForm(true);
            setSelectedPatient(null);
        } else {
            setShowRegisterForm(false);
            setSelectedPatient(null);
        }
    };

    return (
        <FormControl sx={{ width: '100%' }}>
            <TextField
                id="search-query"
                label="Pesquise o Paciente pelo nome, registro ou nome da mãe"
                variant="standard"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
            />
        </FormControl>
    );
};

export default PatientSearch;

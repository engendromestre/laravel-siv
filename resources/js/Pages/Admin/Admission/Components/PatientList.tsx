import { Patient } from '@/types/Patients';
import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';
import React from 'react';

interface PatientListProps {
    patients: Patient[];
    handleSelectPatient: (patient: Patient) => void;
}

const PatientList: React.FC<PatientListProps> = ({
    patients,
    handleSelectPatient,
}) => {
    return (
        <Box sx={{ marginTop: 2 }}>
            {patients.length === 0 && (
                <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                >
                    Nenhum paciente encontrado. Tente novamente ou cadastre um
                    novo paciente.
                </Typography>
            )}

            {patients.length > 0 && (
                <>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        align="center"
                        sx={{ marginBottom: 2 }}
                    >
                        Clique em um paciente para selecionar
                    </Typography>
                    <List>
                        {patients.map((patient) => (
                            <ListItem
                                component="div"
                                key={patient.id}
                                onClick={() =>
                                    patient.status === 'i' &&
                                    handleSelectPatient(patient)
                                }
                                sx={{
                                    cursor:
                                        patient.status === 'i'
                                            ? 'pointer'
                                            : 'default',
                                    '&:hover': {
                                        backgroundColor:
                                            patient.status === 'i'
                                                ? '#f0f0f0'
                                                : 'transparent',
                                    },
                                    borderRadius: 2,
                                    marginBottom: 1,
                                    opacity: patient.status === 'i' ? 1 : 0.5,
                                }}
                            >
                                <Avatar
                                    alt={patient.name}
                                    src={
                                        typeof patient.photo === 'string'
                                            ? patient.photo
                                            : ''
                                    }
                                    sx={{ marginRight: 2 }}
                                />
                                <ListItemText
                                    primary={patient.name}
                                    secondary={`Registro: ${patient.register} | Mãe: ${patient.mother_name}`}
                                    sx={{
                                        color:
                                            patient.status === 'i'
                                                ? 'inherit'
                                                : 'text.secondary',
                                    }}
                                />
                                {patient.status === 'a' && (
                                    <Typography
                                        variant="caption"
                                        color="error"
                                        sx={{ marginLeft: 2 }}
                                    >
                                        Paciente já admitido
                                    </Typography>
                                )}
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
        </Box>
    );
};

export default PatientList;

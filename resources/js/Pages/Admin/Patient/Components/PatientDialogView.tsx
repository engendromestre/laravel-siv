import { Patient } from '@/types/Patients';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PatientProfile from './PatientProfile';

interface PatientProfileDialogProps {
    open: boolean;
    onClose: () => void;
    patientId: number | null;
}

const DialogView: React.FC<PatientProfileDialogProps> = ({
    open,
    onClose,
    patientId,
}) => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (open && patientId) {
            setLoading(true);

            axios
                .get(route('patient.show', { id: patientId }))
                .then(({ data }) => {
                    setPatient(data);
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }
    }, [open, patientId]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Informações do Paciente</DialogTitle>
            <DialogContent>
                {loading ? (
                    <CircularProgress />
                ) : patient ? (
                    <PatientProfile patient={patient} />
                ) : (
                    <Typography variant="body1" color="error">
                        Paciente não encontrado.
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogView;

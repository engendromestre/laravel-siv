import { PatientAdmissions } from '@/types/Admissions';
import CloseIcon from '@mui/icons-material/Close';
import UpdateDisabledIcon from '@mui/icons-material/UpdateDisabled';
import {
    Drawer,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import dayjs from 'dayjs';

interface AdmissionsDrawerProps {
    open: boolean;
    onClose: () => void;
    selectedPatient: PatientAdmissions | null;
}

const AdmissionsDrawer = ({
    open,
    onClose,
    selectedPatient,
}: AdmissionsDrawerProps) => {
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <div style={{ width: 350, padding: 16 }}>
                <IconButton onClick={onClose} style={{ float: 'right' }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6">
                    {selectedPatient?.name} ({selectedPatient?.register})
                </Typography>

                <Typography variant="body1">
                    Gênero:{' '}
                    {selectedPatient?.gender === 'f' ? 'Feminino' : 'Masculino'}
                </Typography>
                <Typography variant="body1">
                    Data de Nascimento:{' '}
                    {dayjs(selectedPatient?.birth_date).format('DD/MM/YYYY')}
                </Typography>

                <Typography variant="h6" sx={{ mt: 2 }}>
                    Admissões
                </Typography>
                {selectedPatient?.admissions.length ? (
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Data</TableCell>
                                    <TableCell>Motivo</TableCell>
                                    <TableCell>Alta</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedPatient.admissions.map((admission) => (
                                    <TableRow key={admission.id}>
                                        <TableCell>
                                            {dayjs(
                                                admission.admission_datetime,
                                            ).format('DD/MM/YYYY')}
                                        </TableCell>
                                        <TableCell>
                                            {admission.reason_for_admission ||
                                                'Não informado'}
                                        </TableCell>
                                        <TableCell>
                                            {admission.discharge_datetime ? (
                                                dayjs(
                                                    admission.discharge_datetime,
                                                ).format('DD/MM/YYYY')
                                            ) : (
                                                <UpdateDisabledIcon />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography>Nenhuma admissão encontrada</Typography>
                )}
            </div>
        </Drawer>
    );
};

export default AdmissionsDrawer;

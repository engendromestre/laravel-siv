import { Admission } from '@/types/Admissions';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import React from 'react';

interface PatientProfileTableAdmissionsProps {
    admissions: Admission[];
}

const PatientProfileTableAdmissions: React.FC<
    PatientProfileTableAdmissionsProps
> = ({ admissions }) => {
    return (
        <TableContainer
            component={Paper}
            sx={{ maxWidth: 700, margin: 'auto', marginTop: 5 }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Data de Admissão</TableCell>
                        <TableCell>Data de Alta</TableCell>
                        <TableCell>Motivo da Admissão</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {admissions.map((admission) => (
                        <TableRow key={admission.id}>
                            <TableCell>
                                {new Date(
                                    admission.admission_datetime,
                                ).toLocaleString()}
                            </TableCell>
                            <TableCell>
                                {admission.discharge_datetime
                                    ? new Date(
                                          admission.discharge_datetime,
                                      ).toLocaleString()
                                    : 'N/A'}
                            </TableCell>
                            <TableCell>
                                {admission.reason_for_admission || 'N/A'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PatientProfileTableAdmissions;

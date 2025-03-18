import ButtonForm from '@/Components/ButtonForm';
import CardProj from '@/Components/CardProj';
import { CustomDateTimePicker } from '@/Components/CustomDateTimePicker';
import { Admission, PatientAdmissions } from '@/types/Admissions';
import { useForm } from '@inertiajs/react';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { enqueueSnackbar } from 'notistack';
import React, { FormEventHandler, useEffect } from 'react';

dayjs.extend(minMax);
interface AdmissionDialogProps {
    open: boolean;
    onClose: () => void;
    patientAdmission: PatientAdmissions;
    onUpdateAdmission?: (updatedAdmission: Admission) => void; // Função para atualizar a admissão
}

const AdmissionDialog: React.FC<AdmissionDialogProps> = ({
    open,
    onClose,
    patientAdmission,
}) => {
    const theme = useTheme();

    const { data, setData, patch, errors, processing } = useForm({
        patient_status: patientAdmission.status as 'a' | 'i',
        patient_id: patientAdmission.id,
        admission_id: patientAdmission.admissions[0].id,
        discharge_datetime: '',
        notes: '',
    });

    useEffect(() => {
        if (!data.discharge_datetime) {
            setData('discharge_datetime', dayjs().format('YYYY-MM-DD HH:mm'));
        }
    }, [data.discharge_datetime, setData]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('admission.update', data.admission_id), {
            onSuccess: () => {
                enqueueSnackbar('Admissão atualizada com sucesso!', {
                    variant: 'success',
                });
                onClose();
            },
            onError: () => {
                enqueueSnackbar('Erro ao atualizar o admissão!', {
                    variant: 'error',
                });
            },
        });
    };

    const admissionDateTime = patientAdmission.admissions[0].admission_datetime;
    // Calcula os limites baseado no mês atual
    const startOfMonth = dayjs().startOf('month'); // Primeiro dia do mês
    const endOfMonth = dayjs().endOf('month'); // Último dia do mês
    // minDateTime = Maior entre a data de admissão e o primeiro dia do mês
    const minDateTime = dayjs
        .max(dayjs(admissionDateTime), startOfMonth)
        .format('YYYY-MM-DD HH:mm');

    // maxDateTime = Último dia do mês
    const maxDateTime = endOfMonth.format('YYYY-MM-DD HH:mm');
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Registrar Alta </DialogTitle>
            <DialogContent>
                <CardProj variant="outlined">
                    <Typography
                        component="p"
                        variant="body1"
                        gutterBottom
                        sx={{
                            mb: 4,
                            fontWeight: 'bold',
                            color: theme.palette.primary.main,
                        }}
                    >{`[ ${patientAdmission.register} ] ${patientAdmission.name}`}</Typography>
                    <Box
                        component="form"
                        onSubmit={submit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <Typography variant="body1">
                                <strong>Admissão: </strong>{' '}
                                {dayjs(
                                    patientAdmission.admissions[0]
                                        .admission_datetime,
                                ).format('DD/MM/YYYY HH:mm')}
                            </Typography>
                        </FormControl>
                        <FormControl>
                            <CustomDateTimePicker
                                label="Alta"
                                value={data.discharge_datetime}
                                onChange={(value) =>
                                    setData('discharge_datetime', value)
                                }
                                error={!!errors.discharge_datetime}
                                minDateTime={minDateTime}
                                maxDateTime={maxDateTime}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                error={!!errors.notes}
                                helperText={errors.notes}
                                label="Notas (Opcional)"
                                fullWidth
                                multiline
                                rows={3}
                                sx={{ marginBottom: 2 }}
                                value={data.notes}
                                onChange={(e) =>
                                    setData('notes', e.target.value)
                                }
                                autoFocus
                            />
                        </FormControl>
                        <ButtonForm disabled={processing}>Salvar</ButtonForm>
                    </Box>
                </CardProj>
            </DialogContent>
        </Dialog>
    );
};

export default AdmissionDialog;

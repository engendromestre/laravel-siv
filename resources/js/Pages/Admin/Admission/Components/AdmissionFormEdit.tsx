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
import { enqueueSnackbar } from 'notistack';
import React, { FormEventHandler, useEffect } from 'react';

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

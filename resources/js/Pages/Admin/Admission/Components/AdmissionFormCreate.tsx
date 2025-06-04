import { Patient } from '@/types/Patients';
import { router, useForm, usePage } from '@inertiajs/react';
import { AccountCircle, AddCircle } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid2 as Grid,
    TextField,
    Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { FormEventHandler, useEffect, useState } from 'react';

interface AdmissionFormProps {
    selectedPatient: Patient;
}

const AdmissionFormCreate: React.FC<AdmissionFormProps> = ({
    selectedPatient,
}) => {
    const user = usePage().props.auth.user;

    const [formattedDateTime, setFormattedDateTime] = useState<string>(
        new Date().toLocaleString('pt-BR'),
    );
    const [currentDateTime, setCurrentDateTime] = useState<string>(
        new Date().toISOString().slice(0, 19).replace('T', ' '),
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();

            // Formato para exibição (dd/mm/yyyy HH:MM:SS)
            setFormattedDateTime(now.toLocaleString('pt-BR'));

            // Formato para banco (YYYY-MM-DD HH:MM:SS)
            setCurrentDateTime(
                now.toISOString().slice(0, 19).replace('T', ' '),
            );
        }, 1000); // Atualiza a cada segundo

        return () => clearInterval(interval);
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, setData, post, errors, processing } = useForm<{
        admission_datetime: string;
        reason_for_admission: string;
        user_id: number;
        patient_id: number;
    }>({
        admission_datetime: currentDateTime, // Formato MySQL
        reason_for_admission: '',
        user_id: user.id ?? 0,
        patient_id: selectedPatient.id ?? 0,
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        post(route('admission.store'), {
            onSuccess: () => {
                enqueueSnackbar('Paciente admitido com sucesso!', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    onExited: () => {
                        router.get(route('admissions.list'));
                    },
                });
            },
            onError: (error) => {
                console.log(error);
                enqueueSnackbar('Erro ao admitir o paciente!', {
                    variant: 'error',
                });
            },
        });
    };

    return (
        <Box
            component="form"
            onSubmit={submit}
            noValidate
            autoComplete="off"
            sx={{
                width: '100%',
                maxWidth: { sm: '100%', md: '1700px' },
            }}
        >
            <Box>
                <Typography
                    variant="h5"
                    mb={2}
                    textAlign="center"
                    sx={{
                        color: (theme) =>
                            theme.palette.mode === 'dark'
                                ? theme.palette.primary.main
                                : theme.palette.primary.dark,
                    }}
                >
                    Detalhes da Admissão
                </Typography>
                <Grid container alignItems="left" justifyContent="left">
                    <Grid size={{ xs: 6, sm: 6, lg: 6 }}>
                        <Avatar
                            alt={selectedPatient.name}
                            src={selectedPatient.photo as string}
                            sx={{
                                width: 150,
                                height: 150,
                                marginBottom: 2,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                border: '2px solid #fff',
                                boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 6, lg: 6 }}>
                        <Typography variant="h6" mb={1}>
                            {selectedPatient.name}
                        </Typography>
                        <Typography variant="body1" mb={1}>
                            <strong>Registro:</strong>{' '}
                            {selectedPatient.register}
                        </Typography>
                        <Typography variant="body1" mb={1}>
                            <strong>Mãe:</strong> {selectedPatient.mother_name}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ marginBottom: 2 }} />
                <Grid
                    container
                    alignItems="center"
                    spacing={2}
                    sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                >
                    <Grid>
                        <Avatar
                            sx={{
                                width: 50,
                                height: 50,
                                boxShadow: 1,
                                bgcolor: 'primary.main',
                            }}
                        >
                            <AccountCircle
                                sx={{ color: 'white', fontSize: 32 }}
                            />
                        </Avatar>
                    </Grid>
                    <Grid>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Usuário responsável pela admissão
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.name}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    alignItems="left"
                    justifyContent="left"
                    sx={{ mt: 2 }}
                >
                    {/* Campo oculto para enviar ao backend */}
                    <input
                        type="hidden"
                        name="admission_datetime"
                        value={currentDateTime}
                    />
                    <TextField
                        error={!!errors.admission_datetime}
                        helperText={errors.admission_datetime}
                        label="Data/Hora da Admissão *"
                        fullWidth
                        value={formattedDateTime} // Exibe no formato pt-BR
                        slotProps={{
                            input: {
                                readOnly: true,
                                style: {
                                    color: '#b0b0b0', // Cor do texto para um tom mais suave
                                    cursor: 'not-allowed', // Cursor indicando que não pode ser editado
                                },
                            },
                        }}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        error={!!errors.reason_for_admission}
                        helperText={errors.reason_for_admission}
                        label="Motivo da Admissão (Opcional)"
                        fullWidth
                        multiline
                        rows={3}
                        sx={{ marginBottom: 2 }}
                        value={data.reason_for_admission}
                        onChange={(e) =>
                            setData('reason_for_admission', e.target.value)
                        }
                        autoFocus
                    />
                </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    disabled={processing}
                    variant="contained"
                    startIcon={<AddCircle />}
                    type="submit"
                >
                    Admitir Paciente
                </Button>
            </Box>
        </Box>
    );
};

export default AdmissionFormCreate;

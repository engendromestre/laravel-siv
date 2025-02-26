import { Patient } from '@/types/Patients';
import { Cancel, CheckCircle, Female, Male } from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardContent,
    Grid2 as Grid,
    Stack,
    Typography,
} from '@mui/material';
import React from 'react';

interface PatientProfileProps {
    patient: Patient;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patient }) => {
    const { name, birth_date, gender, status, photo } = patient;
    const photoPath = photo as string;
    const birthDateObj = new Date(birth_date);

    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    const dayDiff = today.getDate() - birthDateObj.getDate();

    // Se ainda não fez aniversário este ano, subtrai 1
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return (
        <Card sx={{ maxWidth: 700, margin: 'auto', marginTop: 5 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid sx={{ xs: 12, sm: 6 }}>
                        <Avatar
                            alt={name}
                            src={photoPath}
                            sx={{ width: 150, height: 150 }}
                        />
                    </Grid>
                    <Grid sx={{ xs: 12, sm: 6 }}>
                        <Typography variant="h5" sx={{ marginBottom: 2 }}>
                            {name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            align="right"
                            sx={{ marginBottom: 2 }}
                        >
                            {age} anos
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            align="right"
                            sx={{ marginBottom: 2 }}
                        >
                            {gender === 'm' ? (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                >
                                    <Male />
                                    <Typography
                                        variant="body1"
                                        color="textSecondary"
                                    >
                                        Masculino
                                    </Typography>
                                </Stack>
                            ) : (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                >
                                    <Female />
                                    <Typography
                                        variant="body1"
                                        color="textSecondary"
                                    >
                                        Feminino
                                    </Typography>
                                </Stack>
                            )}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            align="right"
                            noWrap
                            sx={{ marginBottom: 2 }}
                        >
                            {status === 'a' ? (
                                <>
                                    <CheckCircle
                                        sx={{ color: 'green', marginRight: 1 }}
                                    />
                                    Não Internado
                                </>
                            ) : (
                                <>
                                    <Cancel
                                        sx={{ color: 'red', marginRight: 1 }}
                                    />
                                    Internado
                                </>
                            )}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PatientProfile;

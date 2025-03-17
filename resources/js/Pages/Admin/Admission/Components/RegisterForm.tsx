// RegisterForm.tsx
import { Box, Button, Typography } from '@mui/material';
import React from 'react';

interface RegisterFormProps {
    handleRegisterPatient: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
    handleRegisterPatient,
}) => {
    return (
        <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6" gutterBottom>
                Paciente não encontrado. Cadastre-o:
            </Typography>
            <Button variant="contained" onClick={handleRegisterPatient}>
                Cadastrar Paciente
            </Button>
        </Box>
    );
};

export default RegisterForm;

import { Cancel, CheckCircle } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface StatusCellProps {
    status: string;
}

const PatientStatusCell: React.FC<StatusCellProps> = ({ status }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            {status === 'i' ? (
                <>
                    <Cancel sx={{ color: 'red', marginRight: 1 }} />
                    <Typography variant="body2">Não Admitido</Typography>
                </>
            ) : (
                <>
                    <CheckCircle sx={{ color: 'green', marginRight: 1 }} />
                    <Typography variant="body2">Admitido</Typography>
                </>
            )}
        </Box>
    );
};

export default PatientStatusCell;

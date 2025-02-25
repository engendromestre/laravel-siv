import { Avatar, Box } from '@mui/material';
import React from 'react';

interface StatusCellProps {
    urlPhoto: string;
    name: string;
}

const PatientPhotoAvatar: React.FC<StatusCellProps> = ({ urlPhoto, name }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            <Avatar src={urlPhoto} alt={name} sx={{ width: 50, height: 50 }} />
        </Box>
    );
};

export default PatientPhotoAvatar;

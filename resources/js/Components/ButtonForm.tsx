import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

interface ButtonFormProps {
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}

export default function ButtonForm({
    disabled = false,
    onClick,
    children,
}: ButtonFormProps) {
    const theme = useTheme();

    return (
        <Box
            component="button"
            disabled={disabled}
            onClick={onClick}
            sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                '&:disabled': {
                    backgroundColor: theme.palette.action.disabledBackground,
                    color: theme.palette.action.disabled,
                    cursor: 'not-allowed',
                },
            }}
        >
            {children}
        </Box>
    );
}

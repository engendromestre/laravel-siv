import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import React from 'react';

interface DialogDeleteProps {
    open: boolean;
    onClose: () => void;
    id: number | null;
    onDelete: (id: number) => void;
}

export const DialogDelete: React.FC<DialogDeleteProps> = ({
    open,
    onClose,
    id,
    onDelete,
}) => {
    const handleDelete = () => {
        if (id !== null) {
            onDelete(id);
            onClose(); // Fecha o diálogo após a exclusão
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogContent>
                <p>Tem certeza que deseja remover esse registro?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleDelete} color="secondary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

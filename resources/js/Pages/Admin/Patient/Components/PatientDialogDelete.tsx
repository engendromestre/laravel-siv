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
    patientId: number | null;
    onDelete: (id: number) => void;
}

const DialogDelete: React.FC<DialogDeleteProps> = ({
    open,
    onClose,
    patientId,
    onDelete,
}) => {
    const handleDelete = () => {
        if (patientId !== null) {
            onDelete(patientId);
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

export default DialogDelete;

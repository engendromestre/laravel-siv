import { IUser } from '@/types/Auth';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserRoleProfile from './UserRoleProfile';

interface RoleDialogViewProps {
    open: boolean;
    onClose: () => void;
    userId: number | null;
}

export const RoleDialogView: React.FC<RoleDialogViewProps> = ({
    open,
    onClose,
    userId,
}) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (open && userId) {
            setLoading(true);
            axios
                .get(route('user.show', { id: userId }))
                .then(({ data }) => {
                    setUser(data);
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }
    }, [open, userId]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Informações do Usuário</DialogTitle>
            <DialogContent>
                {loading ? (
                    <CircularProgress />
                ) : user ? (
                    <UserRoleProfile user={user} />
                ) : (
                    <Typography variant="body1" color="error">
                        Usuário não encontrado.
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

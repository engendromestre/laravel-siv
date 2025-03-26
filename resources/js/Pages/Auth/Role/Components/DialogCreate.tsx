import { Permission } from '@/types/Auth';
import { useForm, usePage } from '@inertiajs/react';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import { FormEventHandler } from 'react';
import { RoleForm } from './RoleForm';

interface DialogCreateRoleProps {
    open: boolean;
    onClose: () => void;
    allPermissions: Permission[];
}

export const DialogCreateRole: React.FC<DialogCreateRoleProps> = ({
    open,
    onClose,
    allPermissions,
}) => {
    const userId = usePage().props.auth.user.id;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, setData, post, errors, processing } = useForm({
        userId: userId,
        roleName: '',
        permissions: [],
    });
    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        console.log(data);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle className="sm:pbs-16 sm:pbe-6 sm:pli-16 flex flex-col gap-2 text-center">
                <Box>
                    <Typography variant="h6" mt={4}>
                        Adicionar Papel
                    </Typography>
                    <Typography variant="body1">
                        Definir Permissões do Papel
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <RoleForm
                    allPermissions={allPermissions}
                    onClose={onClose}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    submit={submit}
                />
            </DialogContent>
        </Dialog>
    );
};

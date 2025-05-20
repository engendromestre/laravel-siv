import { IAutoCompleteProjOption } from '@/Components/AutoCompleteProj';
import { IPermission } from '@/types/Auth';
import { router, useForm } from '@inertiajs/react';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { FormEventHandler } from 'react';
import { RoleForm } from './RoleForm';

interface DialogCreateRoleProps {
    open: boolean;
    onClose: () => void;
    allUsers: IAutoCompleteProjOption[];
    allPermissions: IPermission[];
}

export const DialogCreateRole: React.FC<DialogCreateRoleProps> = ({
    open,
    onClose,
    allUsers,
    allPermissions,
}) => {
    // const userId = usePage().props.auth.user.id;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, setData, post, errors, processing } = useForm({
        name: '', //Role Name
        users_ids: [],
        permissions_ids: [],
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        post(route('role.store'), {
            onSuccess: () => {
                enqueueSnackbar('Papel cadastrado com sucesso!', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    onExited: () => {
                        router.get(route('role.index'));
                    },
                });
            },
            onError: () => {
                enqueueSnackbar('Erro ao cadastrar papel!', {
                    variant: 'error',
                    autoHideDuration: 1500,
                });
            },
        });
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
                    allUsers={allUsers}
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

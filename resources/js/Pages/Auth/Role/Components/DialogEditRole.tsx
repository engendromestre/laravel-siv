import { IAutoCompleteProjOption } from '@/Components/AutoCompleteProj';
import { IPermission, IRole } from '@/types/Auth';
import { router, useForm } from '@inertiajs/react';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { FormEventHandler, useEffect } from 'react';
import { RoleForm } from './RoleForm';

interface DialogEditRoleProps {
    open: boolean;
    onClose: () => void;
    allUsers: IAutoCompleteProjOption[];
    allPermissions: IPermission[];
    role: IRole | null;
}

export const DialogEditRole: React.FC<DialogEditRoleProps> = ({
    open,
    onClose,
    allUsers,
    allPermissions,
    role,
}) => {
    // const userId = usePage().props.auth.user.id;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, setData, put, errors, processing } = useForm({
        role_id: role?.id,
        users_ids: [] as number[],
        name: '', //Role Name
        permissions_ids: [] as number[],
    });

    // Efeito para popular os dados do formulário quando o role mudar
    useEffect(() => {
        if (role) {
            const oldUsers = role.users.map((u) => u.id);
            setData('users_ids', oldUsers);
            const oldPermissions = role.permissions.map((p) => p.id);
            setData('permissions_ids', oldPermissions);
            const oldName = role.name;
            setData('name', oldName);
        }
    }, [role, setData]);

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        put(route('role.update'), {
            onSuccess: () => {
                enqueueSnackbar('Papel do Usuário atualizado com sucesso!', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    onExited: () => {
                        router.get(route('role.index'));
                    },
                });
            },
            onError: (error) => {
                console.error(error);
                enqueueSnackbar('Erro ao atualizar o Papel do Usuário!', {
                    variant: 'error',
                });
            },
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle className="sm:pbs-16 sm:pbe-6 sm:pli-16 flex flex-col gap-2 text-center">
                <Box>
                    <Typography variant="h6" mt={4}>
                        Editar Papel
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

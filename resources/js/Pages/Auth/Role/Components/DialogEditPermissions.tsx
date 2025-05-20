import { IPermission, IUser } from '@/types/Auth';
import { router, useForm } from '@inertiajs/react';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { FormEventHandler, useEffect, useState } from 'react';
import { PermissionsFieldset } from './PermissionsFieldset';
import UserRoleProfile from './UserRoleProfile';

interface DialogEditPermssionsProps {
    open: boolean;
    onClose: () => void;
    allPermissions: IPermission[];
    userId: number | null;
}
// TRAZER AS PERMISSÕES ATUAIS DO USUARIO

export const DialogEditPermssions: React.FC<DialogEditPermssionsProps> = ({
    open,
    onClose,
    allPermissions,
    userId,
}) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    // const userId = usePage().props.auth.user.id;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, setData, put, errors, processing } = useForm({
        user_id: 0,
        permissions_ids: [] as number[],
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        if (!userId) return;
        setLoading(true);
        put(route('user.permissions.update', { user: userId }), {
            onSuccess: () => {
                setLoading(false);
                enqueueSnackbar('Permissões cadastradas com sucesso!', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    onExited: () => {
                        router.get(route('role.index'));
                    },
                });
            },
            onError: () => {
                enqueueSnackbar('Erro ao cadastrar as permissões!', {
                    variant: 'error',
                    autoHideDuration: 1500,
                });
            },
        });
    };

    useEffect(() => {
        if (open && userId) {
            setLoading(true);
            axios
                .get(route('user.show', { id: userId }))
                .then(({ data }) => {
                    setUser(data);
                    const perms = data.permissions.map(
                        (p: IPermission) => p.id,
                    );
                    setData('permissions_ids', perms);
                })
                .catch((error: unknown) => console.error(error))
                .finally(() => setLoading(false));
        }
    }, [open, setData, userId]);

    const handlePermissionChange = (id: number) => {
        const updatedPermissionsIds = data.permissions_ids.includes(id)
            ? data.permissions_ids.filter((permId) => permId !== id)
            : [...data.permissions_ids, id];

        setData('permissions_ids', updatedPermissionsIds);
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setData(
                'permissions_ids',
                allPermissions.map((p) => p.id),
            );
        } else {
            setData('permissions_ids', []);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle className="sm:pbs-16 sm:pbe-6 sm:pli-16 flex flex-col gap-2">
                <Box>
                    <Typography variant="h6">
                        Editar Permissões do Usuário
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : user ? (
                    <Box
                        component="form"
                        onSubmit={submit}
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '100%' },

                            padding: '20px',
                            width: '100%',
                        }}
                    >
                        <UserRoleProfile user={user} />
                        <PermissionsFieldset
                            title="Permissões do Usuário"
                            allPermissions={allPermissions.map((p) => ({
                                ...p,
                                id: Number(p.id),
                            }))}
                            selectedPermissions={data.permissions_ids}
                            onPermissionToggle={handlePermissionChange}
                            onSelectAll={handleSelectAll}
                            errors={errors}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mt: 3,
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={processing}
                            >
                                Salvar
                            </Button>
                            <Button
                                type="button"
                                variant="outlined"
                                color="primary"
                                onClick={onClose}
                                sx={{ ml: 1 }}
                            >
                                Cancelar
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Typography variant="body1" color="error">
                        Usuário não encontrado.
                    </Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

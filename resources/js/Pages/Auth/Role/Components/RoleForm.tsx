import AutocompleteProj, {
    IAutoCompleteProjOption,
} from '@/Components/AutoCompleteProj';
import { IPermission } from '@/types/Auth';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { PermissionsFieldset } from './PermissionsFieldset';

interface RoleCreate {
    users_ids: number[];
    name: string;
    permissions_ids: number[];
}

type SetDataFunction = (
    field: keyof RoleCreate,
    value: string | number[],
) => void;

interface RoleFormProps {
    allUsers: IAutoCompleteProjOption[];
    allPermissions: IPermission[];
    onClose: () => void;
    data: RoleCreate;
    setData: SetDataFunction;
    errors: Record<string, string>;
    processing: boolean;
    submit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const RoleForm: React.FC<RoleFormProps> = ({
    allUsers,
    allPermissions,
    onClose,
    data,
    setData,
    errors,
    processing,
    submit,
}) => {
    // Função para alternar seleção de todas as permissões
    const handleSelectPermissionsAll = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.checked) {
            setData(
                'permissions_ids',
                allPermissions.map((p) => p.id),
            ); // Sempre um array de números
        } else {
            setData('permissions_ids', []);
        }
    };

    const handlePermissionChange = (id: number) => {
        const updatedPermissionsIds = data.permissions_ids.includes(id)
            ? data.permissions_ids.filter((permId) => permId !== id)
            : [...data.permissions_ids, id];

        setData('permissions_ids', updatedPermissionsIds);
    };

    const getSelectedUsers = () => {
        return allUsers.filter((user) =>
            data.users_ids.includes(Number(user.id)),
        );
    };

    const handleUserChange = (selectedUsers: IAutoCompleteProjOption[]) => {
        const updatedUserIds = selectedUsers.map((user) => Number(user.id));
        setData('users_ids', updatedUserIds);
    };

    return (
        <Box
            component="form"
            onSubmit={submit}
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' },

                padding: '20px',
                width: '100%',
            }}
        >
            <TextField
                error={!!errors.name}
                helperText={errors.name}
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                fullWidth
                label="Papel"
                id="role"
                autoFocus
                slotProps={{
                    input: {
                        endAdornment: (
                            <AssignmentIndIcon
                                sx={{
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            />
                        ),
                    },
                }}
            />

            <AutocompleteProj
                options={allUsers}
                label="Usuários"
                placeholder="Selecione o(s) usuário(s)"
                values={getSelectedUsers()}
                onChange={handleUserChange}
                width="100%"
                error={errors.users_ids}
            />

            <PermissionsFieldset
                allPermissions={allPermissions}
                selectedPermissions={data.permissions_ids}
                onPermissionToggle={handlePermissionChange}
                onSelectAll={handleSelectPermissionsAll}
                errors={
                    errors.permissions_ids
                        ? { permissions: errors.permissions_ids }
                        : {}
                }
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
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
    );
};

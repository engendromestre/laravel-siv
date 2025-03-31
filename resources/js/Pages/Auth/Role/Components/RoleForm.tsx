import AutocompleteProj, {
    IAutoCompleteProjOption,
} from '@/Components/AutoCompleteProj';
import { IPermission } from '@/types/Auth';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid2 as Grid,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';
import { PermissionGroup } from './PermissionGroup';
import { SelectAllPermissions } from './SelectAllPermissions';

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

    // Agrupar permissões por entidade (ex: 'admin patients', 'admin admissions')
    const groupedPermissions = allPermissions.reduce(
        (acc, permission) => {
            const [group, action] = permission.name.split(':');
            if (!acc[group]) {
                acc[group] = {};
            }
            acc[group][action] = permission;
            return acc;
        },
        {} as Record<string, Record<string, IPermission>>,
    );

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
                otions={allUsers}
                label="Usuários"
                placeholder="Selecione o(s) usuário(s)"
                values={getSelectedUsers()}
                onChange={handleUserChange}
                width="100%"
                error={errors.users_ids}
            />

            <FormControl
                error={!!errors.permissions_ids}
                component="fieldset"
                sx={{ width: '100%' }}
            >
                {' '}
                <Typography
                    variant="h5"
                    className="mb-2 font-semibold text-gray-600"
                    sx={{ marginTop: 5 }}
                >
                    Permissões do Papel
                </Typography>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid size={6}>
                        <Typography className="mb-2 font-semibold text-gray-600">
                            Acesso de Administrador
                        </Typography>
                    </Grid>
                    <Grid container justifyContent="flex-end" size={6}>
                        <SelectAllPermissions
                            allPermissions={allPermissions}
                            selectedPermissions={data.permissions_ids}
                            onSelectAll={handleSelectPermissionsAll}
                        />
                    </Grid>
                </Grid>
                {Object.entries(groupedPermissions).map(([group, actions]) => (
                    <PermissionGroup
                        key={group}
                        group={group}
                        actions={actions}
                        selectedPermissions={data.permissions_ids}
                        handlePermissionChange={handlePermissionChange}
                    />
                ))}
                {/* Exibir erro de permissões abaixo do grupo de checkboxes */}
                {errors.permissions_ids && (
                    <FormHelperText sx={{ mt: 1 }}>
                        {errors.permissions_ids}
                    </FormHelperText>
                )}
            </FormControl>

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

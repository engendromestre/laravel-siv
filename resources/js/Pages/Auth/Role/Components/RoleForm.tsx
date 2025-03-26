import { Permission } from '@/types/Auth';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid2 as Grid,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import React from 'react';

interface RoleCreate {
    userId: number;
    roleName: string;
    permissions: number[];
}

type SetDataFunction = (
    field: keyof RoleCreate,
    value: string | number[],
) => void;

interface RoleFormProps {
    allPermissions: Permission[];
    onClose: () => void;
    data: RoleCreate;
    setData: SetDataFunction;
    errors: Record<string, string>;
    processing: boolean;
    submit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const RoleForm: React.FC<RoleFormProps> = ({
    allPermissions,
    onClose,
    data,
    setData,
    errors,
    processing,
    submit,
}) => {
    const theme = useTheme();

    // Função para alternar seleção de todas as permissões
    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setData(
                'permissions',
                allPermissions.map((p) => p.id),
            ); // Sempre um array de números
        } else {
            setData('permissions', []);
        }
    };

    const handlePermissionChange = (id: number) => {
        const updatedPermissions = data.permissions.includes(id)
            ? data.permissions.filter((permId) => permId !== id)
            : [...data.permissions, id];

        setData('permissions', updatedPermissions);
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
        {} as Record<string, Record<string, Permission>>,
    );

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
                error={!!errors.roleName}
                value={data.roleName}
                onChange={(e) => setData('roleName', e.target.value)}
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
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={
                                    data.permissions.length ===
                                    allPermissions.length
                                }
                                onChange={handleSelectAll}
                                color="primary"
                                sx={{ marginLeft: 2 }}
                            />
                        }
                        label="Selecionar Todos"
                        className="mb-2 font-semibold text-gray-600"
                    />
                </Grid>
            </Grid>

            {Object.entries(groupedPermissions).map(([group, actions]) => (
                <Grid
                    size={6}
                    key={group}
                    container
                    alignItems="center"
                    spacing={2}
                    sx={{
                        borderBottom: `1px solid ${theme.palette.grey[200]}`,
                    }}
                >
                    <Grid size={6}>
                        <Typography>{group}</Typography>
                    </Grid>
                    <Grid container justifyContent="flex-end" size={6}>
                        {['create', 'read', 'write'].map((action) =>
                            actions[action] ? (
                                <FormControlLabel
                                    key={actions[action].id}
                                    control={
                                        <Checkbox
                                            color="primary"
                                            value={actions[action].id}
                                            checked={data.permissions.includes(
                                                actions[action].id,
                                            )}
                                            onChange={() =>
                                                handlePermissionChange(
                                                    actions[action].id,
                                                )
                                            }
                                        />
                                    }
                                    label={
                                        action.charAt(0).toUpperCase() +
                                        action.slice(1)
                                    }
                                />
                            ) : null,
                        )}
                    </Grid>
                </Grid>
            ))}
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

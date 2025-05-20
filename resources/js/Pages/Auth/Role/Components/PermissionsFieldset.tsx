import { IPermission } from '@/types/Auth';
import {
    FormControl,
    FormHelperText,
    Grid2 as Grid,
    Typography,
} from '@mui/material';
import React from 'react';
import { PermissionGroup } from './PermissionGroup';
import { SelectAllPermissions } from './SelectAllPermissions';

interface PermissionsFieldsetProps {
    title?: string;
    allPermissions: IPermission[];
    selectedPermissions: number[];
    errors: Record<string, string>;
    onPermissionToggle: (id: number) => void;
    onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PermissionsFieldset: React.FC<PermissionsFieldsetProps> = ({
    title = 'Permissões do Papel',
    allPermissions,
    selectedPermissions,
    errors,
    onPermissionToggle,
    onSelectAll,
}) => {
    // Agrupar permissões por grupo (antes dos ":")
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

    return (
        <FormControl
            error={!!errors}
            component="fieldset"
            sx={{ width: '100%' }}
        >
            <Typography
                variant="h5"
                className="mb-2 font-semibold text-gray-600"
                sx={{ marginTop: 5 }}
            >
                {title}
            </Typography>

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid size={6}>
                    <Typography className="mb-2 font-semibold text-gray-600">
                        Permissões
                    </Typography>
                </Grid>
                <Grid container justifyContent="flex-end" size={6}>
                    <SelectAllPermissions
                        allPermissions={allPermissions}
                        selectedPermissions={selectedPermissions}
                        onSelectAll={onSelectAll}
                    />
                </Grid>
            </Grid>

            {Object.entries(groupedPermissions).map(([group, actions]) => (
                <PermissionGroup
                    key={group}
                    group={group}
                    actions={actions}
                    selectedPermissions={selectedPermissions}
                    handlePermissionChange={onPermissionToggle}
                />
            ))}

            {errors && (
                <FormHelperText sx={{ mt: 1 }}>
                    {Object.keys(errors).map((key) => (
                        <div key={key}>{errors[key]}</div>
                    ))}
                </FormHelperText>
            )}
        </FormControl>
    );
};

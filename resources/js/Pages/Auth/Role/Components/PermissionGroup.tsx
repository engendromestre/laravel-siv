import { Grid2 as Grid, Typography, useTheme } from '@mui/material';
import { PermissionCheckbox } from './PermissionCheckbox';

interface PermissionGroupProps {
    group: string;
    actions: Record<string, { id: number; name: string }>;
    selectedPermissions: number[];
    handlePermissionChange: (id: number) => void;
}

export const PermissionGroup: React.FC<PermissionGroupProps> = ({
    group,
    actions,
    selectedPermissions,
    handlePermissionChange,
}) => {
    const theme = useTheme();
    return (
        <Grid
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
                {['create', 'read', 'write'].map(
                    (action) =>
                        actions[action] && (
                            <PermissionCheckbox
                                key={actions[action].id}
                                id={actions[action].id}
                                label={
                                    action.charAt(0).toUpperCase() +
                                    action.slice(1)
                                }
                                checked={selectedPermissions.includes(
                                    actions[action].id,
                                )}
                                onChange={() =>
                                    handlePermissionChange(actions[action].id)
                                }
                            />
                        ),
                )}
            </Grid>
        </Grid>
    );
};

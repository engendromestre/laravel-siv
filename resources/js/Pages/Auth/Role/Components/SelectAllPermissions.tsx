import { IPermission } from '@/types/Auth';
import { Checkbox, FormControlLabel } from '@mui/material';

interface SelectAllPermissionsProps {
    allPermissions: IPermission[];
    selectedPermissions: number[];
    onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SelectAllPermissions: React.FC<SelectAllPermissionsProps> = ({
    allPermissions,
    selectedPermissions,
    onSelectAll,
}) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={
                        selectedPermissions.length === allPermissions.length
                    }
                    onChange={onSelectAll}
                    color="primary"
                />
            }
            label="Selecionar Todos"
        />
    );
};

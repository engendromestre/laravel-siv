import { Checkbox, FormControlLabel } from '@mui/material';

interface PermissionCheckboxProps {
    id: number;
    label: string;
    checked: boolean;
    onChange: () => void;
}

export const PermissionCheckbox: React.FC<PermissionCheckboxProps> = ({
    id,
    label,
    checked,
    onChange,
}) => (
    <FormControlLabel
        control={
            <Checkbox
                color="primary"
                value={id}
                checked={checked}
                onChange={onChange}
            />
        }
        label={label}
    />
);

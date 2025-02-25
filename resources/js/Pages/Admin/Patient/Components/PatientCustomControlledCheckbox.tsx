import { Checkbox } from '@mui/material';

interface ControlledCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export function ControlledCheckbox({
    checked,
    onChange,
}: ControlledCheckboxProps) {
    return (
        <Checkbox
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
}

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { FormControlLabel } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export interface IAutoCompleteProjOption {
    id: number | string;
    name: string;
}

interface AutocompleteProjProps {
    otions: IAutoCompleteProjOption[];
    label?: string;
    placeholder?: string;
    values: IAutoCompleteProjOption[];
    onChange: (value: IAutoCompleteProjOption[]) => void;
    width?: number | string;
    error?: string;
}

export default function AutocompleteProj({
    otions,
    label = 'Selecione',
    placeholder = 'Opções',
    values,
    onChange,
    width = 500,
    error,
}: AutocompleteProjProps) {
    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-siv"
            options={otions}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            value={values}
            onChange={(_event, newValue) => {
                onChange(newValue);
            }}
            renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                    <li key={key} {...optionProps}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    color="primary"
                                    checked={selected}
                                />
                            }
                            label={option.name}
                        />
                    </li>
                );
            }}
            style={{ width }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder}
                    error={!!error} // Mostra erro se existir
                    helperText={error} // Exibe a mensagem de erro
                />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
        />
    );
}

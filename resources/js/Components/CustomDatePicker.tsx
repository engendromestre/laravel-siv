import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importa a localização

interface CustomDatePickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
}

export function CustomDatePicker({
    label,
    value,
    onChange,
    error,
}: CustomDatePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <DatePicker
                label={label}
                value={value ? dayjs(value) : null}
                onChange={(date) =>
                    onChange(date ? date.format('YYYY-MM-DD') : '')
                }
                slotProps={{ textField: { error, helperText: 'DD/MM/YYYY' } }}
                format="DD/MM/YYYY"
            />
        </LocalizationProvider>
    );
}

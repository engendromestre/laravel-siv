import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export function CustomBirthDatePicker({
    value,
    onChange,
    error,
}: {
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Data de Nascimento"
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

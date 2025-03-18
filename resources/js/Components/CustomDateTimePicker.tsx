import { DateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importa a localização
import { useEffect, useState } from 'react';

interface CustomDatePickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
    minDateTime?: string; // Agora aceita um valor mínimo opcional
    maxDateTime?: string; // Agora aceita um valor máximo opcional
}

export function CustomDateTimePicker({
    label,
    value,
    onChange,
    error,
    minDateTime,
    maxDateTime,
}: CustomDatePickerProps) {
    const [internalValue, setInternalValue] = useState(dayjs(value || dayjs()));
    useEffect(() => {
        if (!value) {
            const interval = setInterval(() => {
                setInternalValue(dayjs());
            }, 60000); // Atualiza a cada 60 segundos

            return () => clearInterval(interval);
        }
    }, [value]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                <DateTimePicker
                    label={label}
                    value={
                        value && dayjs(value).isValid()
                            ? dayjs(value)
                            : internalValue
                    }
                    onChange={(date) => {
                        if (date && date.isValid()) {
                            const formatted = date.format('YYYY-MM-DD HH:mm');
                            setInternalValue(dayjs(formatted));
                            onChange(formatted);
                        }
                    }}
                    slotProps={{
                        textField: { error, helperText: 'DD/MM/YYYY HH:mm' },
                    }}
                    viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                    }}
                    format="DD/MM/YYYY HH:mm"
                    minDateTime={minDateTime ? dayjs(minDateTime) : undefined}
                    maxDateTime={maxDateTime ? dayjs(maxDateTime) : undefined}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}

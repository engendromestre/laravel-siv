import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UseDateFieldProps } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
    BaseSingleInputFieldProps,
    DateValidationError,
    FieldSection,
} from '@mui/x-date-pickers/models';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { useState } from 'react';

interface ButtonFieldProps
    extends UseDateFieldProps<Dayjs, false>,
        BaseSingleInputFieldProps<
            Dayjs | null,
            Dayjs,
            FieldSection,
            false,
            DateValidationError
        > {
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ButtonField(props: ButtonFieldProps) {
    const {
        setOpen,
        label,
        id,
        disabled,
        InputProps: { ref } = {},
        inputProps: { 'aria-label': ariaLabel } = {},
    } = props;

    return (
        <Button
            variant="outlined"
            id={id}
            disabled={disabled}
            ref={ref}
            aria-label={ariaLabel}
            size="small"
            onClick={() => setOpen?.((prev) => !prev)}
            startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
            sx={{ minWidth: 'fit-content' }}
        >
            {label ? `${label}` : 'Escolha uma data'}
        </Button>
    );
}

export default function CustomDatePicker() {
    const [value, setValue] = useState<Dayjs | null>(dayjs());
    const [open, setOpen] = useState(false);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <DatePicker
                value={value}
                label={value == null ? null : value.format('DD MMM, YYYY')}
                onChange={(newValue) => setValue(newValue)}
                slots={{ field: ButtonField }}
                slotProps={{
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    field: { setOpen } as any,
                    nextIconButton: { size: 'small' },
                    previousIconButton: { size: 'small' },
                }}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                views={['day', 'month', 'year']}
            />
        </LocalizationProvider>
    );
}

import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UseDateFieldProps } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ptBR } from '@mui/x-date-pickers/locales';
import {
    BaseSingleInputFieldProps,
    DateValidationError,
    FieldSection,
} from '@mui/x-date-pickers/models';
import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';

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
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());
    const [open, setOpen] = React.useState(false);

    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
            localeText={
                ptBR.components.MuiLocalizationProvider.defaultProps.localeText
            }
        >
            <DatePicker
                value={value}
                label={value == null ? null : value.format('DD MMM, YYYY')}
                onChange={(newValue) => setValue(newValue)}
                slots={{ field: ButtonField }}
                slotProps={{
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

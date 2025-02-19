import CardProj from '@/Components/CardProj';
import { useForm } from '@inertiajs/react';
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormEventHandler } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importa a localização

export default function CreatePatientInformationForm() {
    // const user = usePage().props.auth.user;
    const theme = useTheme();
    // const { enqueueSnackbar } = useSnackbar();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            register: '',
            name: '',
            gender: '' as 'm' | 'f',
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
    };

    return (
        <CardProj variant="outlined">
            <Typography
                component="p"
                variant="body1"
                gutterBottom
                sx={{
                    mb: 4,
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                }}
            >
                Insira as informações do Paciente.
            </Typography>

            <Box
                component="form"
                onSubmit={submit}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                }}
            >
                <FormControl>
                    <TextField
                        label="Registro"
                        error={!!errors.register}
                        helperText={errors.register}
                        id="register"
                        type="text"
                        name="register"
                        placeholder="123456789"
                        value={data.register}
                        className="mt-1 block w-full"
                        autoComplete="off"
                        required
                        fullWidth
                        variant="outlined"
                        onChange={(e) =>
                            setData(
                                'register',
                                e.target.value.replace(/\D+/g, '').slice(0, 9),
                            )
                        }
                        slotProps={{
                            htmlInput: {
                                maxLength: 9,
                            },
                        }}
                        color={errors.register ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        label="Nome Completo"
                        error={!!errors.name}
                        helperText={errors.name}
                        id="name"
                        name="name"
                        placeholder="Seu Nome"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        required
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setData('name', e.target.value)}
                        color={errors.name ? 'error' : 'primary'}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel id="gender-controlled-radio-buttons-group">
                        Gênero
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="gender-radio-buttons-group-label"
                        defaultValue="female"
                        name="gender"
                        value={data.gender}
                        onChange={(e) =>
                            setData('gender', e.target.value as 'm' | 'f')
                        }
                    >
                        <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Feminino"
                        />
                        <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Masculino"
                        />
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <CustomDatePicker />
                </FormControl>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Box
                        component="button"
                        disabled={processing}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            padding: '8px 16px',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            '&:disabled': {
                                backgroundColor:
                                    theme.palette.action.disabledBackground,
                                color: theme.palette.action.disabled,
                                cursor: 'not-allowed',
                            },
                        }}
                    >
                        Salvar
                    </Box>
                </Box>
            </Box>
        </CardProj>
    );
}

export function CustomDatePicker() {
    dayjs.locale('pt-br');
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <DatePicker
                label="Data de Nascimento"
                slotProps={{
                    textField: {
                        helperText: 'DD/MM/YYYY',
                    },
                }}
            />
        </LocalizationProvider>
    );
}

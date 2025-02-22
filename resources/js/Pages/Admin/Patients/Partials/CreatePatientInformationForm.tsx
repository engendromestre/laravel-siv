import {
    Box,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';

import { PatientFormData } from '@/types/Patients';
import 'dayjs/locale/pt-br'; // Importa a localização
import { CustomBirthDatePicker } from '../Components/PatientCustomBirthDatePicker';
import { ControlledCheckbox } from '../Components/PatientCustomControlledCheckbox';

type FormErrors = Partial<Record<keyof PatientFormData, string | string[]>>;
type SetDataFunction = (field: keyof PatientFormData, value: string) => void;

export default function CreatePatientInformationForm({
    errors,
    data,
    setData,
}: {
    errors: FormErrors;
    data: PatientFormData;
    setData: SetDataFunction;
}) {
    // const user = usePage().props.auth.user;
    const theme = useTheme();

    return (
        <Box>
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
                <FormControl error={!!errors.gender}>
                    <FormLabel id="gender-controlled-radio-buttons-group">
                        Gênero
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="gender-radio-buttons-group-label"
                        defaultValue="f"
                        name="gender"
                        value={data.gender}
                        onChange={(e) =>
                            setData('gender', e.target.value as 'm' | 'f')
                        }
                    >
                        <FormControlLabel
                            value="f"
                            control={<Radio />}
                            label="Feminino"
                        />
                        <FormControlLabel
                            value="m"
                            control={<Radio />}
                            label="Masculino"
                        />
                    </RadioGroup>
                    {errors.gender && (
                        <FormHelperText>{errors.gender}</FormHelperText>
                    )}
                </FormControl>

                <FormControl>
                    <CustomBirthDatePicker
                        value={data.birthDate}
                        onChange={(value) => setData('birthDate', value)}
                        error={!!errors.birthDate}
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        label="Nome da Mãe"
                        error={!!errors.motherName}
                        helperText={errors.motherName}
                        id="motherName"
                        name="motherName"
                        placeholder="Nome da Mãe"
                        value={data.motherName}
                        className="mt-1 block w-full"
                        autoComplete="off"
                        required
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setData('motherName', e.target.value)}
                        color={errors.motherName ? 'error' : 'primary'}
                    />
                </FormControl>

                <FormControl>
                    <FormControlLabel
                        label="Ativo"
                        control={
                            <ControlledCheckbox
                                checked={data.status === 'a'}
                                onChange={(checked) =>
                                    setData('status', checked ? 'a' : 'i')
                                }
                            />
                        }
                    />
                </FormControl>
            </Box>
        </Box>
    );
}

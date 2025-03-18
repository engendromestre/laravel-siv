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

import { CustomDatePicker } from '@/Components/CustomDatePicker';
import { Patient } from '@/types/Patients';

type FormErrors = Partial<Record<keyof Patient, string | string[]>>;
type SetDataFunction = (field: keyof Patient, value: string) => void;

export default function CreatePatientInformationForm({
    errors,
    data,
    setData,
}: {
    errors: FormErrors;
    data: Patient;
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
                Atualize as informações do Paciente.
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
                        onChange={(e) => setData('register', e.target.value)}
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
                        name="gender"
                        value={data.gender}
                        onChange={(e) => setData('gender', e.target.value)}
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
                    <CustomDatePicker
                        label="Data de Nascimento"
                        value={data.birth_date}
                        onChange={(value) => setData('birth_date', value)}
                        error={!!errors.birth_date}
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        label="Nome da Mãe"
                        error={!!errors.mother_name}
                        helperText={errors.mother_name}
                        id="mother_name"
                        name="mother_name"
                        placeholder="Nome da Mãe"
                        value={data.mother_name}
                        className="mt-1 block w-full"
                        autoComplete="off"
                        required
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setData('mother_name', e.target.value)}
                        color={errors.mother_name ? 'error' : 'primary'}
                    />
                </FormControl>

                {/* <FormControl>
                    <FormControlLabel
                        label="Admitido"
                        control={
                            <ControlledCheckbox
                                checked={data.status === 'a'}
                                onChange={(checked) =>
                                    setData('status', checked ? 'a' : 'i')
                                }
                            />
                        }
                    />
                </FormControl> */}
            </Box>
        </Box>
    );
}

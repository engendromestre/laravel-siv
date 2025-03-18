import ButtonForm from '@/Components/ButtonForm';
import CardProj from '@/Components/CardProj';
import UploadPhoto from '@/Components/Upload/ UploadPhoto';
import { Patient } from '@/types/Patients';
import { Box, Grid2 as Grid } from '@mui/material';
import CreatePatientInformationForm from './CreatePatientInformationForm';

type SetDataFunction = (field: keyof Patient, value: string) => void;

interface CreatePatientFormProps {
    data: Patient;
    setData: SetDataFunction;
    submit: (event: React.FormEvent<HTMLFormElement>) => void;
    processing: boolean;
    errors: Record<string, string>;
    setPhotoFile: (file: File | null) => void;
}

const CreatePatientForm = ({
    data,
    setData,
    errors,
    setPhotoFile,
    processing,
    submit,
}: CreatePatientFormProps) => {
    return (
        <Box
            component="form"
            onSubmit={submit}
            noValidate
            autoComplete="off"
            sx={{
                width: '100%',
                maxWidth: { sm: '100%', md: '1700px' },
            }}
        >
            <Grid
                container
                spacing={1}
                justifyContent="center" // Centraliza os itens no Grid
                alignItems="center" // Alinha verticalmente no centro
            >
                <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
                    <UploadPhoto onImageChange={setPhotoFile} errors={errors} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                    <CardProj
                        variant="outlined"
                        sx={{ width: '100%', maxWidth: '800px' }}
                    >
                        {' '}
                        {/* Ajuste a largura aqui */}
                        <CreatePatientInformationForm
                            errors={errors}
                            data={data}
                            setData={setData}
                        />
                        <ButtonForm disabled={processing}>Salvar</ButtonForm>
                    </CardProj>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CreatePatientForm;

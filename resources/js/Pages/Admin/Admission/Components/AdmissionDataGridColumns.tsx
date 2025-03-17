import { ActionsMenu } from '@/Components/ActionsMenu';
import { PatientAdmissions } from '@/types/Admissions';
import { Female, Male } from '@mui/icons-material';
import { Box } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import PatientPhotoAvatar from '../../Patient/Components/PatientPhotoAvatar';
import PatientStatusCell from '../../Patient/Components/PatientStatusDatagrid';

interface PatientColumnProps {
    setSelectedPatient: (patient: PatientAdmissions) => void;
    setOpenDialogEdit: (open: boolean) => void;
}

const admissionColumns = ({
    setSelectedPatient,
    setOpenDialogEdit,
}: PatientColumnProps): GridColDef[] => [
    { field: 'id', headerName: 'ID', flex: 0.2 },
    {
        field: 'photo',
        headerName: 'Imagem',
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        flex: 0.5,
        headerAlign: 'center',
        renderCell: (params: GridRenderCellParams) => {
            return (
                <PatientPhotoAvatar
                    urlPhoto={params.row.photo}
                    name={params.row.name}
                />
            );
        },
    },
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'register', headerName: 'Registro', flex: 0.8 },
    {
        field: 'gender',
        headerName: 'Gênero',
        flex: 0.5,
        renderCell: (params: GridRenderCellParams) => {
            return params.value === 'M' ? (
                <Male color="primary" />
            ) : (
                <Female color="secondary" />
            );
        },
    },
    {
        field: 'birth_date',
        headerName: 'Nascimento',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            return dayjs(params.value).format('DD/MM/YYYY');
        },
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => (
            <PatientStatusCell status={params.value} />
        ),
    },
    {
        field: 'actions',
        headerName: '',
        flex: 0.5,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        align: 'right',
        renderHeader: () => (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} />
        ),
        renderCell: (params: GridRenderCellParams) => (
            <div onClick={(event) => event.stopPropagation()}>
                <ActionsMenu
                    rowId={params.row.id}
                    onEdit={() => {
                        // alta do paciente
                        setSelectedPatient(params.row); // Passando o ID para o setSelectedPatientId
                        setOpenDialogEdit(true); // Abre o diálogo
                    }}
                />
            </div>
        ),
    },
];

export default admissionColumns;

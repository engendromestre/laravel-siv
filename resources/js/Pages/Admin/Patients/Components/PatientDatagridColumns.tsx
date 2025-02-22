import { ActionsMenu } from '@/Components/ActionsMenu';
import { Box } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import PatientPhotoAvatar from './PatientPhotoAvatar';
import PatientStatusCell from './PatientStatusDatagrid';

const patientColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.1 },
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
    {
        field: 'name',
        headerName: 'Nome',
        flex: 1,
    },

    {
        field: 'motherName',
        headerName: 'Mãe',
        flex: 1,
    },
    {
        field: 'birthDate',
        headerName: 'Nascimento',
        flex: 1,
        valueFormatter: (params: GridRenderCellParams) => {
            // Se params.value for uma string, você precisa garantir que é um formato de data válido.
            const birthDate = dayjs(params.value);

            // Formatar a data com dayjs
            return birthDate.isValid() ? birthDate.format('DD/MM/YYYY') : '-'; // Retorna '-' se a data não for válida
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
            <ActionsMenu
                rowId={params.row.id}
                onView={() => {
                    console.log('view', params.row.id);
                }}
                onEdit={() => {
                    console.log('edit', params.row.id);
                }}
                onDelete={() => {
                    console.log('delete', params.row.id);
                }}
            />
        ),
    },
];

export default patientColumns;

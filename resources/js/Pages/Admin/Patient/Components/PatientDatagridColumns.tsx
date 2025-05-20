import { ActionsMenu } from '@/Components/ActionsMenu';
import { router } from '@inertiajs/react';
import { Box } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import PatientPhotoAvatar from './PatientPhotoAvatar';
import PatientStatusCell from './PatientStatusDatagrid';

interface PatientColumnProps {
    setSelectedPatientId: (id: number) => void;
    setOpenDialogDelete: (open: boolean) => void;
    setOpenDialogView: (open: boolean) => void;
}

const patientColumns = ({
    setSelectedPatientId,
    setOpenDialogDelete,
    setOpenDialogView,
}: PatientColumnProps): GridColDef[] => [
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
        field: 'mother_name',
        headerName: 'Mãe',
        flex: 1,
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
            <ActionsMenu
                rowId={params.row.id}
                onView={() => {
                    setSelectedPatientId(params.row.id);
                    setOpenDialogView(true);
                }}
                onEdit={() => {
                    const patientId = params.row.id;
                    const editUrl = route('patient.edit', { id: patientId });
                    router.get(editUrl);
                }}
                onDelete={() => {
                    setSelectedPatientId(params.row.id);
                    setOpenDialogDelete(true);
                }}
            />
        ),
    },
];

export default patientColumns;

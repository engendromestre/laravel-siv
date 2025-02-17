import { ActionsMenu } from '@/Components/ActionsMenu';
import { DatagridCustomToolbar } from '@/Components/DatagridCustomToolbar';
import { Patient, PatientList } from '@/types/Patients';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import PatientPhotoAvatar from './PatientPhotoAvatar';
import PatientStatusCell from './PatientStatusDatagrid';

export default function PatientDatagrid({
    patientList,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mustVerifyEmail,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    status,
}: {
    patientList: PatientList | undefined;
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const mapDataToGridRows = (list: PatientList) => {
        const { data } = list;

        console.log(data);
        return data.map((patient: Patient) => {
            return {
                id: patient.id,
                name: patient.name,
                motherName: patient.motherName,
                birthDate: patient.birthDate,
                status: patient.status,
                photos: patient.photos,
            };
        });
    };

    const rows = patientList ? mapDataToGridRows(patientList) : [];

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.1 },
        {
            field: 'photos',
            headerName: 'Imagem',
            flex: 0.5,
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams) => {
                const photosArray = JSON.parse(params.row.photos); // Converte a string JSON em um array
                const firstPhoto = photosArray[0]; // Pega o primeiro item do array

                return (
                    <PatientPhotoAvatar
                        urlPhoto={firstPhoto}
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
                return birthDate.isValid()
                    ? birthDate.format('DD/MM/YYYY')
                    : '-'; // Retorna '-' se a data não for válida
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

    return (
        <Box sx={{ height: '60vh', width: '100%' }}>
            <DataGrid
                ignoreDiacritics
                filterMode="server"
                rows={rows}
                columns={columns}
                // paginationModel={paginationModel}
                // onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                checkboxSelection={false}
                disableRowSelectionOnClick
                disableColumnFilter={true}
                disableColumnSelector={true}
                autoPageSize
                slots={{ toolbar: DatagridCustomToolbar }}
                initialState={{ density: 'comfortable' }}
                sx={{
                    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within':
                        {
                            outline: 'none',
                        },
                    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within':
                        {
                            outline: 'none',
                        },
                    '& .Mui-selected': {
                        outline: 'none !important',
                    },
                }}
            />
        </Box>
    );
}

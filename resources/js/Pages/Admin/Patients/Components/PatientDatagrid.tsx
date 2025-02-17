import { ActionsMenu } from '@/Components/ActionsMenu';
import { DataGridTable } from '@/Components/DatagridTable';
import { Avatar, Box } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

const rows = [
    {
        id: 1,
        photo: 'https://randomuser.me/api/portraits/men/1.jpg',
        lastName: 'Snow',
        firstName: 'Jon',
        age: 14,
    },
    {
        id: 2,
        photo: 'https://randomuser.me/api/portraits/women/2.jpg',
        lastName: 'Lannister',
        firstName: 'Cersei',
        age: 31,
    },
];

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.1 },
    {
        field: 'photo',
        headerName: 'Photo',
        flex: 0.2,
        headerAlign: 'center',
        renderCell: (params: GridRenderCellParams) => (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                }}
            >
                <Avatar
                    src={params.row.photo}
                    alt={params.row.firstName}
                    sx={{ width: 50, height: 50 }}
                />
            </Box>
        ),
    },
    { field: 'firstName', headerName: 'First name', flex: 1, editable: true },
    { field: 'lastName', headerName: 'Last name', flex: 1, editable: true },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        flex: 0.3,
        headerAlign: 'center',
        editable: true,
    },
    {
        field: 'actions',
        headerName: 'Ações',
        flex: 0.5,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        align: 'right',
        renderCell: (params: GridRenderCellParams) => (
            <ActionsMenu
                rowId={params.row.id}
                onView={(id) => console.log('Visualizar', id)}
                onEdit={(id) => console.log('Editar', id)}
                onDelete={(id) => console.log('Apagar', id)}
            />
        ),
    },
];

export default function CustomizedDataGrid() {
    return <DataGridTable columns={columns} rows={rows} />;
}

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { MouseEvent, useState } from 'react';

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
    {
        field: 'firstName',
        headerName: 'First name',
        flex: 1,
        editable: true,
    },

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
            <ActionsMenu row={params.row} />
        ),
    },
];

const ActionsMenu = ({ row }: { row: Record<string, unknown> }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => console.log('view', row.id)}>
                    <VisibilityIcon sx={{ mr: 1 }} /> View
                </MenuItem>
                <MenuItem onClick={() => console.log('edit', row.id)}>
                    <EditIcon sx={{ mr: 1 }} /> Edit
                </MenuItem>
                <MenuItem onClick={() => console.log('delete', row.id)}>
                    <DeleteIcon sx={{ mr: 1 }} /> Delete
                </MenuItem>
            </Menu>
        </Box>
    );
};

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
    {
        id: 3,
        photo: 'https://randomuser.me/api/portraits/men/3.jpg',
        lastName: 'Lannister',
        firstName: 'Jaime',
        age: 31,
    },
    {
        id: 4,
        photo: 'https://randomuser.me/api/portraits/women/4.jpg',
        lastName: 'Stark',
        firstName: 'Arya',
        age: 11,
    },
    {
        id: 5,
        photo: 'https://randomuser.me/api/portraits/women/5.jpg',
        lastName: 'Targaryen',
        firstName: 'Daenerys',
        age: null,
    },
    {
        id: 6,
        photo: 'https://randomuser.me/api/portraits/women/6.jpg',
        lastName: 'Test',
        firstName: 'Test',
        age: null,
    },
];

function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{ margin: 0.5 }}>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <Box sx={{ flexGrow: 1 }} />
            <GridToolbarExport
                slotProps={{
                    tooltip: { title: 'Exportar Dados' },
                    button: { variant: 'text' },
                }}
            />
        </GridToolbarContainer>
    );
}

export default function CustomizedDataGrid() {
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });

    return (
        <Box sx={{ height: '60vh', width: '100%' }}>
            <DataGrid
                rows={rows}
                // rowCount={rows.length}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                checkboxSelection
                disableRowSelectionOnClick
                autoPageSize
                slots={{ toolbar: CustomToolbar }}
                initialState={{ density: 'comfortable' }}
                sx={{
                    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within':
                        {
                            outline: 'none', // Remove a borda azul ao focar na célula
                        },
                    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within':
                        {
                            outline: 'none', // Remove a borda azul ao focar no cabeçalho
                        },
                    '& .Mui-selected': {
                        outline: 'none !important', // Remove o destaque da seleção
                    },
                }}
            />
        </Box>
    );
}

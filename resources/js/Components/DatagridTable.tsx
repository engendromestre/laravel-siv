import { Box } from '@mui/material';
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { useState } from 'react';

type DataGridTableProps = {
    columns: GridColDef[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows: any[];
};

export function DataGridTable({ columns, rows }: DataGridTableProps) {
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });

    return (
        <Box sx={{ height: '60vh', width: '100%' }}>
            <DataGrid
                ignoreDiacritics
                rows={rows}
                // rowCount={rows.length}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                checkboxSelection={false}
                disableRowSelectionOnClick
                autoPageSize
                slots={{ toolbar: CustomToolbar }}
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

function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{ margin: 0.5 }}>
            {/* <GridToolbarColumnsButton /> */}
            {/* <GridToolbarFilterButton /> */}
            <GridToolbarQuickFilter />
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

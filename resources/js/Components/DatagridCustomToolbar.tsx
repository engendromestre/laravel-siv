import { Box } from '@mui/material';
import {
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid';

export function DatagridCustomToolbar() {
    return (
        <GridToolbarContainer sx={{ margin: 0.5 }}>
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

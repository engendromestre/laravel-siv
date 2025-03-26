import { ActionsMenu } from '@/Components/ActionsMenu';
import { Box } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

interface Role {
    id: number;
    name: string;
}

interface UsersRoleColumnProps {
    setSelectedUserId: (id: number) => void;
    setOpenDialogDelete: (open: boolean) => void;
    setOpenDialogView: (open: boolean) => void;
    setOpenDialogEdit: (open: boolean) => void;
}

export const roleColumns = ({
    setSelectedUserId,
    setOpenDialogDelete,
    setOpenDialogView,
    setOpenDialogEdit,
}: UsersRoleColumnProps): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nome', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'E-mail', flex: 1, minWidth: 200 },
    {
        field: 'roles',
        headerName: 'Papel',
        flex: 1,
        minWidth: 200,
        renderCell: (params) =>
            params.value.map((role: Role) => role.name).join(', '),
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
                    setSelectedUserId(params.row.id);
                    setOpenDialogView(true);
                }}
                onEdit={() => {
                    setSelectedUserId(params.row.id);
                    setOpenDialogEdit(true);
                }}
                onDelete={() => {
                    setSelectedUserId(params.row.id);
                    setOpenDialogDelete(true);
                }}
            />
        ),
    },
];

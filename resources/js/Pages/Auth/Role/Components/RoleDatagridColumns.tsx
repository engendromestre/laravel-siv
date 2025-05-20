import { ActionsMenu } from '@/Components/ActionsMenu';
import { Box } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

interface UsersRoleColumnProps {
    setSelectedUserId: (id: number) => void;
    setOpenDialogDeleteUser?: (open: boolean) => void;
    setOpenDialogViewUser?: (open: boolean) => void;
    setOpenDialogEditUserPermissions?: (open: boolean) => void;
}

export const roleColumns = ({
    setSelectedUserId,
    setOpenDialogDeleteUser,
    setOpenDialogViewUser,
    setOpenDialogEditUserPermissions,
}: UsersRoleColumnProps): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nome', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'E-mail', flex: 1, minWidth: 200 },
    {
        field: 'all_permissions',
        headerName: 'Permissões',
        flex: 1,
        minWidth: 200,
        valueGetter: (params) => {
            // Converte o objeto de permissões em array de strings
            return Object.values(params).join(', ');
        },
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
                    setOpenDialogViewUser?.(true);
                }}
                onEdit={
                    params.row.id > 1 // Super Admin cannot be edited
                        ? () => {
                              setSelectedUserId(params.row.id);
                              setOpenDialogEditUserPermissions?.(true);
                          }
                        : undefined
                }
                onDelete={
                    params.row.id > 1
                        ? () => {
                              setSelectedUserId(params.row.id);
                              setOpenDialogDeleteUser?.(true);
                          }
                        : undefined
                }
            />
        ),
    },
];

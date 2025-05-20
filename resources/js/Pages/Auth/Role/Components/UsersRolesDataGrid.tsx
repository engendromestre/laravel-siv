import CardProj from '@/Components/CardProj';
import { useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
}

interface UsersRolesDataGridProps {
    users: User[];
}

export const UsersRolesDataGrid: React.FC<UsersRolesDataGridProps> = ({
    users,
}) => {
    const theme = useTheme();
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Nome', flex: 1, minWidth: 150 },
        { field: 'email', headerName: 'E-mail', flex: 1, minWidth: 200 },
        {
            field: 'roles',
            headerName: 'Papéis',
            flex: 1,
            minWidth: 200,
            renderCell: (params) =>
                params.value.map((role: Role) => role.name).join(', '),
        },
    ];

    const rows = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
    }));

    return (
        <CardProj
            variant="outlined"
            sx={{
                maxWidth: '100%',
                [theme.breakpoints.up('sm')]: { maxWidth: '80%' },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
            />
        </CardProj>
    );
};

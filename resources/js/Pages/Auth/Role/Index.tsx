import CardProj from '@/Components/CardProj';
import { DatagridCustomToolbar } from '@/Components/DatagridCustomToolbar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Permission, Role } from '@/types/Auth';
import { Results } from '@/types/Roles';
import { Head, router } from '@inertiajs/react';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Grid2 as Grid, Typography, useTheme } from '@mui/material';
import {
    DataGrid,
    GridFilterModel,
    GridPaginationModel,
    GridSortModel,
} from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { useState } from 'react';
import { DialogCreateRole } from './Components/DialogCreate';
import { RoleCard } from './Components/RoleCard';
import { RoleCardCreate } from './Components/RoleCardCreate';
import { roleColumns } from './Components/RoleDatagridColumns';
import { RoleDialogView } from './Components/RoleDialogView';

const breadcrumb = [
    { label: 'Dashboard', icon: HomeIcon, href: 'dashboard' },
    { label: 'Papel do Usuário', icon: AssignmentIndIcon },
];

export default function Index({
    roles,
    permissions,
    data,
}: PageProps<{
    roles: Role[];
    permissions: Permission[];
    data: Results;
}>) {
    const theme = useTheme();
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(
        {
            page: data.current_page - 1,
            pageSize: data.per_page,
        },
    );
    const [, setSortModel] = useState<GridSortModel>([]);
    const [search, setSearch] = useState<string>(data?.search || '');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fetchData = (params: Record<string, any>) => {
        router.get(route('role.index'), params, {
            preserveState: true,
            replace: true,
        });
    };

    // ✅ Captura a pesquisa do GridToolbarQuickFilter
    const handleSearchChange = (filterModel: GridFilterModel) => {
        const searchValue = filterModel.quickFilterValues?.[0] || '';
        setSearch(searchValue);

        fetchData({
            search: searchValue,
            perPage: paginationModel.pageSize,
            page: 1, // Reiniciamos para a página 1 ao pesquisar
        });
    };

    const handlePaginationChange = (model: GridPaginationModel) => {
        setPaginationModel(model);
        fetchData({ page: model.page + 1, perPage: model.pageSize, search });
    };

    const handleSortChange = (model: GridSortModel) => {
        setSortModel(model);
        if (model.length > 0) {
            fetchData({
                sortField: model[0].field,
                sortOrder: model[0].sort,
                perPage: paginationModel.pageSize,
                page: 1,
                search,
            });
        }
    };

    const rows = data.data;

    const [openDialogDelete, setOpenDialogDelete] = useState(false);
    const [openDialogView, setOpenDialogView] = useState(false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [openDialogCreate, setOpenDialogCreate] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const columns = roleColumns({
        setSelectedUserId,
        setOpenDialogDelete,
        setOpenDialogView,
        setOpenDialogEdit,
    });

    return (
        <AuthenticatedLayout header={breadcrumb}>
            <Head title="Registrar Papel do Usuário" />
            <Typography
                variant="h5"
                gutterBottom
                sx={{
                    mb: 4,
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                }}
            >
                Lista de Papéis
            </Typography>
            {/* CRIAR DOIS COMPOENTES POIS PRECISARÁ FAZER 2 BUSCAS, 1 PARA ROLES E OUTRAS PARA USERS */}
            <Box sx={{ padding: 2 }}>
                <Grid container spacing={2}>
                    {roles.map((role) => (
                        <Grid key={role.id} sx={{ xs: 12, sm: 6, md: 3 }}>
                            <RoleCard
                                users={role.users}
                                role={role.name}
                                handleRole={() =>
                                    console.log(`Editar função de ${role.id}`)
                                }
                            />
                        </Grid>
                    ))}
                    <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
                        <RoleCardCreate
                            setOpenDialogCreate={setOpenDialogCreate}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Typography
                variant="h5"
                gutterBottom
                sx={{
                    mb: 4,
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                }}
            >
                Total de Usuários com seus Papéis
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                Encontre todas as contas de usuário e seus papéis associados.
            </Typography>
            <CardProj
                variant="outlined"
                sx={{
                    maxWidth: '95%',
                    [theme.breakpoints.up('sm')]: { maxWidth: '95%' },
                }}
            >
                {' '}
                <DataGrid
                    localeText={
                        ptBR.components.MuiDataGrid.defaultProps.localeText
                    }
                    rows={rows}
                    columns={columns}
                    rowCount={data.total}
                    pageSizeOptions={[5, 10, 20]}
                    paginationMode="server"
                    sortingMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={handlePaginationChange}
                    onSortModelChange={handleSortChange}
                    onFilterModelChange={handleSearchChange} // Captura a pesquisa do GridToolbarQuickFilter
                    initialState={{ density: 'comfortable' }}
                    slots={{ toolbar: DatagridCustomToolbar }}
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
            </CardProj>
            {openDialogDelete && <Typography>ToDo</Typography>}
            {openDialogEdit && <Typography>ToDo</Typography>}
            {openDialogView && (
                <RoleDialogView
                    open={openDialogView}
                    onClose={() => setOpenDialogView(false)}
                    userId={selectedUserId}
                />
            )}
            {openDialogCreate && (
                <DialogCreateRole
                    open={openDialogCreate}
                    onClose={() => setOpenDialogCreate(false)}
                    allPermissions={permissions}
                />
            )}
        </AuthenticatedLayout>
    );
}

// import { IAutoCompleteProjOption } from '@/Components/AutoCompleteProj';
import CardProj from '@/Components/CardProj';
import { DatagridCustomToolbar } from '@/Components/DatagridCustomToolbar';
import { DialogDelete } from '@/Components/DialogDelete';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { IPermission, IRole, ResultsUser } from '@/types/Auth';
import { Head, router, usePage } from '@inertiajs/react';
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
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { DialogCreateRole } from './Components/DialogCreateRole';
import { DialogEditPermssions } from './Components/DialogEditPermissions';
import { DialogEditRole } from './Components/DialogEditRole';
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
    roles: IRole[];
    permissions: IPermission[];
    data: ResultsUser;
}>) {
    const { props } = usePage<PageProps>();
    const userPermissions = props.auth.user.permissions;
    const canCreate = userPermissions.includes('auth roles:create');
    const canWrite = userPermissions.includes('auth roles:write');

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
    const [, setOpenDialogDeleteUser] = useState(false);
    const [openDialogViewUser, setOpenDialogViewUser] = useState(false);
    const [openDialogEditUserPermissions, setOpenDialogEditUserPermissions] =
        useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const [openDialogDeleteRole, setOpenDialogDeleteRole] = useState(false);
    const [openDialogEditRole, setOpenDialogEditRole] = useState(false);
    const [openDialogCreateRole, setOpenDialogCreateRole] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
    const [openSelectedRole, setSelectedRole] = useState<IRole | null>(null);

    const columns = roleColumns({
        setSelectedUserId,
        setOpenDialogDeleteUser,
        setOpenDialogViewUser,
        setOpenDialogEditUserPermissions,
    });

    const handleDeleteRole = (role_id: number) => {
        router.delete(route('role.destroy', { id: role_id }), {
            onSuccess: () => {
                enqueueSnackbar('Papel excluido com sucesso!', {
                    variant: 'success',
                });
                setOpenDialogDeleteRole(false); // Fecha o diálogo após a exclusão
            },
            onError: (e) => {
                console.error(e);
            },
        });
    };

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
            <Box sx={{ padding: 2 }}>
                <Grid container spacing={2}>
                    {roles.map((role) => (
                        <Grid key={role.id} sx={{ xs: 12, sm: 6, md: 3 }}>
                            <RoleCard
                                users={role.users}
                                role={role.name}
                                handleRoleEdit={
                                    canWrite
                                        ? () => {
                                              setOpenDialogEditRole(true);
                                              setSelectedRole(role);
                                          }
                                        : undefined
                                }
                                handleRoleDelete={
                                    canWrite
                                        ? () => {
                                              setOpenDialogDeleteRole(true);
                                              setSelectedRoleId(role.id);
                                          }
                                        : undefined
                                }
                            />
                        </Grid>
                    ))}
                    <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
                        {canCreate && (
                            <RoleCardCreate
                                setOpenDialogCreate={setOpenDialogCreateRole}
                            />
                        )}
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
            {openDialogCreateRole && (
                <DialogCreateRole
                    open={openDialogCreateRole}
                    onClose={() => setOpenDialogCreateRole(false)}
                    allUsers={data.data.map((item) => ({
                        id: item.id,
                        name: item.name,
                    }))}
                    allPermissions={permissions}
                />
            )}

            {openDialogDeleteRole && (
                <DialogDelete
                    open={openDialogDeleteRole}
                    onClose={() => setOpenDialogDeleteRole(false)}
                    id={selectedRoleId}
                    onDelete={handleDeleteRole}
                />
            )}

            {openDialogEditRole && (
                <DialogEditRole
                    open={openDialogEditRole}
                    onClose={() => setOpenDialogEditRole(false)}
                    allUsers={data.data.map((item) => ({
                        id: item.id,
                        name: item.name,
                    }))}
                    allPermissions={permissions}
                    role={openSelectedRole}
                />
            )}

            {openDialogViewUser && (
                <RoleDialogView
                    open={openDialogViewUser}
                    onClose={() => setOpenDialogViewUser(false)}
                    userId={selectedUserId}
                />
            )}

            {openDialogEditUserPermissions && (
                <DialogEditPermssions
                    open={openDialogEditUserPermissions}
                    onClose={() => setOpenDialogEditUserPermissions(false)}
                    allPermissions={permissions}
                    userId={selectedUserId}
                />
            )}
        </AuthenticatedLayout>
    );
}

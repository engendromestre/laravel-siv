import CardProj from '@/Components/CardProj';
import { DatagridCustomToolbar } from '@/Components/DatagridCustomToolbar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Results } from '@/types/Patients';
import { Head, router } from '@inertiajs/react';
import { AddCircle } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import {
    DataGrid,
    GridFilterModel,
    GridPaginationModel,
    GridSortModel,
} from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import patientColumns from './Components/PatientDatagridColumns';
import DialogDelete from './Components/PatientDialogDelete';

const breadcrumb = [
    { label: 'Dashboard', icon: HomeIcon, href: 'dashboard' },
    { label: 'Paciente', icon: PeopleIcon },
];

export default function Index({
    data,
}: PageProps<{
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
        router.get(route('patient.index'), params, {
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

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
        null,
    );
    const columns = patientColumns({ setSelectedPatientId, setOpenDialog });
    const handleDeletePatient = (patientId: number) => {
        router.delete(route('patient.destroy', { id: patientId }), {
            onSuccess: () => {
                enqueueSnackbar('Paciente excluido com sucesso!', {
                    variant: 'success',
                });
                setOpenDialog(false); // Fecha o diálogo após a exclusão
            },
            onError: () => {
                console.error('Erro ao excluir paciente');
            },
        });
    };
    return (
        <AuthenticatedLayout header={breadcrumb}>
            <Head title="Listar Pacientes" />
            <CardProj
                variant="outlined"
                sx={{
                    maxWidth: '100%',
                    [theme.breakpoints.up('sm')]: { maxWidth: '90%' },
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ pb: 2 }}
                >
                    <Typography component="h2" variant="h5" sx={{ mb: 0 }}>
                        Listar Pacientes
                    </Typography>
                    <Button
                        variant="contained"
                        href={route('patient.create')}
                        startIcon={<AddCircle />}
                        sx={{ alignSelf: 'center' }}
                    >
                        Novo Paciente
                    </Button>
                </Stack>
                <DataGrid
                    localeText={
                        ptBR.components.MuiDataGrid.defaultProps.localeText
                    }
                    rows={data.data}
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
            {openDialog && (
                <DialogDelete
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    patientId={selectedPatientId}
                    onDelete={handleDeletePatient}
                />
            )}
        </AuthenticatedLayout>
    );
}

import CardProj from '@/Components/CardProj';
import { DatagridCustomToolbar } from '@/Components/DatagridCustomToolbar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { PatientAdmissions, Results } from '@/types/Admissions';
import { Head, router } from '@inertiajs/react';
import { AddCircle } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { Alert, Button, Stack, Typography, useTheme } from '@mui/material';
import {
    DataGrid,
    GridFilterModel,
    GridPaginationModel,
    GridSortModel,
} from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import dayjs from 'dayjs';
import { useState } from 'react';
import admissionColumns from './Components/AdmissionDataGridColumns';
import AdmissionFormEdit from './Components/AdmissionFormEdit';
import AdmissionsDrawer from './Components/AdmissionsDrawer';

dayjs.locale('pt-br');

const breadcrumb = [
    { label: 'Dashboard', icon: HomeIcon, href: 'dashboard' },
    { label: 'Pacientes Admitidos', icon: RecentActorsIcon },
];

export default function List({
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

    // Captura a pesquisa do GridToolbarQuickFilter
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fetchData = (params: Record<string, any>) => {
        router.get(route('admissions.list'), params, {
            preserveState: true,
            replace: true,
        });
    };

    const formattedData = data.data.map((patient: PatientAdmissions) => ({
        id: patient.id,
        name: patient.name,
        register: patient.register,
        photo: patient.photo,
        gender: patient.gender,
        status: patient.status,
        birth_date: dayjs(patient.birth_date).startOf('day').toDate(),
        admissions: patient.admissions, // Lista de Admissões
    }));

    const [selectedPatient, setSelectedPatient] =
        useState<PatientAdmissions | null>(null);
    const [openDrawer, setOpenDrawer] = useState(false);

    // Função para abrir o Drawer ao clicar em um paciente
    const handleRowClick = (patient: PatientAdmissions) => {
        // passar somente o registro da última admissão
        setSelectedPatient(patient);
        setOpenDrawer(true);
    };

    // Função para fechar o Drawer
    const handleCloseDrawer = () => {
        setOpenDrawer(false);
        setSelectedPatient(null);
    };

    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const columns = admissionColumns({
        setSelectedPatient,
        setOpenDialogEdit,
    });

    return (
        <AuthenticatedLayout header={breadcrumb}>
            <Head title="Listar Pacientes Admitidos" />
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
                        Listar Pacientes Admitidos
                    </Typography>
                    <Button
                        variant="contained"
                        href={route('admission.index')}
                        startIcon={<AddCircle />}
                        sx={{ alignSelf: 'center' }}
                    >
                        Admitir Paciente
                    </Button>
                </Stack>
                {formattedData.length > 0 ? (
                    <DataGrid
                        localeText={
                            ptBR.components.MuiDataGrid.defaultProps.localeText
                        }
                        rows={formattedData}
                        onRowClick={(e) => handleRowClick(e.row)}
                        columns={columns}
                        rowCount={data.total}
                        pageSizeOptions={[5, 10, 20]}
                        paginationMode="server"
                        sortingMode="server"
                        paginationModel={paginationModel}
                        onPaginationModelChange={handlePaginationChange}
                        onSortModelChange={handleSortChange}
                        onFilterModelChange={handleSearchChange}
                        initialState={{ density: 'comfortable' }}
                        slots={{
                            toolbar: DatagridCustomToolbar,
                        }}
                        sx={{
                            '& .MuiDataGrid-row': {
                                cursor: 'pointer',
                            },
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
                ) : (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="info">
                            Nenhum registro encontrado.
                        </Alert>
                    </Stack>
                )}
            </CardProj>
            {/* Drawer na lateral direita */}
            {selectedPatient && (
                <AdmissionsDrawer
                    open={openDrawer}
                    onClose={handleCloseDrawer}
                    selectedPatient={selectedPatient}
                />
            )}

            {openDialogEdit && selectedPatient !== null && (
                <AdmissionFormEdit
                    open={openDialogEdit}
                    onClose={() => setOpenDialogEdit(false)}
                    patientAdmission={selectedPatient}
                />
            )}
        </AuthenticatedLayout>
    );
}

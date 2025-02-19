import { DatagridCustomToolbar } from '@/Components/DatagridCustomToolbar';
import { Patient, PatientList } from '@/types/Patients';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { useEffect, useState } from 'react';
import patientColumns from './PatientDatagridColumns';

export default function PatientDatagrid({
    patientList,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mustVerifyEmail,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    status,
    fetchPatients, // Função para buscar pacientes ao mudar a página
}: {
    patientList: PatientList | undefined;
    mustVerifyEmail: boolean;
    status?: string;
    fetchPatients: (page: number, pageSize: number) => void;
}) {
    // Configuração da paginação baseada nos dados do backend
    const totalRecords = patientList ? patientList.total : 0;
    const pageSize = patientList ? patientList.per_page : 10; // Tamanho padrão de 10
    const currentPage = patientList ? patientList.current_page : 1;

    const [paginationModel, setPaginationModel] = useState({
        page: currentPage - 1, // O DataGrid começa as páginas do 0
        pageSize: pageSize,
    });

    // Sincroniza os dados quando `patientList` muda
    useEffect(() => {
        setPaginationModel({
            page: currentPage - 1,
            pageSize: pageSize,
        });
    }, [currentPage, pageSize]);

    // Chama a função de busca ao mudar a paginação
    const handlePaginationChange = (model: {
        page: number;
        pageSize: number;
    }) => {
        setPaginationModel(model);
        fetchPatients(model.page + 1, model.pageSize); // Backend começa no 1
    };

    // Mapeia os dados do backend para os campos do DataGrid
    const mapDataToGridRows = (list: PatientList) => {
        return list.data.map((patient: Patient) => ({
            id: patient.id,
            name: patient.name,
            motherName: patient.motherName,
            birthDate: patient.birthDate,
            status: patient.status,
            photos: patient.photos,
        }));
    };

    const rows = patientList ? mapDataToGridRows(patientList) : [];

    return (
        <Box sx={{ height: '70vh', width: '100%' }}>
            <DataGrid
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                ignoreDiacritics
                filterMode="server" // Filtros processados no backend
                sortingMode="server" // Ordenação processada no backend
                paginationMode="server" // Paginação processada no backend
                rows={rows}
                rowCount={totalRecords}
                columns={patientColumns}
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationChange}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                checkboxSelection={false}
                disableRowSelectionOnClick
                disableColumnFilter
                disableColumnSelector
                slots={{ toolbar: DatagridCustomToolbar }}
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

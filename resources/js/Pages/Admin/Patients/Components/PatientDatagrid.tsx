import { DatagridCustomToolbar } from '@/Components/DatagridCustomToolbar';
import { Patient, PatientList } from '@/types/Patients';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import patientColumns from './PatientDatagridColumns';

export default function PatientDatagrid({
    patientList,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mustVerifyEmail,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    status,
}: {
    patientList: PatientList | undefined;
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const mapDataToGridRows = (list: PatientList) => {
        const { data } = list;

        console.log(list);
        return data.map((patient: Patient) => {
            return {
                id: patient.id,
                name: patient.name,
                motherName: patient.motherName,
                birthDate: patient.birthDate,
                status: patient.status,
                photos: patient.photos,
            };
        });
    };

    const rows = patientList ? mapDataToGridRows(patientList) : [];

    const columns = patientColumns;

    return (
        <Box sx={{ height: '60vh', width: '100%' }}>
            <DataGrid
                ignoreDiacritics
                filterMode="server"
                rows={rows}
                columns={columns}
                // paginationModel={paginationModel}
                // onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                checkboxSelection={false}
                disableRowSelectionOnClick
                disableColumnFilter={true}
                disableColumnSelector={true}
                autoPageSize
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

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Button, Card, CardContent, Grid2 as Grid } from '@mui/material';

interface RoleCardCreateProps {
    setOpenDialogCreate: (open: boolean) => void;
}

export const RoleCardCreate: React.FC<RoleCardCreateProps> = ({
    setOpenDialogCreate,
}) => {
    return (
        <Card
            sx={{
                width: 300, // Largura fixa
                maxWidth: '100%', // Garante responsividade
                height: 140, // Altura fixa
                backgroundColor: '#FFF',
                margin: 2,
                display: 'flex', // Mantém a estrutura flexível
                flexDirection: 'column', // Mantém o layout organizado
                justifyContent: 'space-between', // Distribui os elementos internamente
            }}
        >
            <CardContent>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid container justifyContent="flex-start" sx={{ xs: 6 }}>
                        <AssignmentIndIcon
                            sx={{ fontSize: 90, color: 'primary' }}
                        />
                    </Grid>
                    <Grid
                        container
                        justifyContent="flex-end"
                        sx={{ xs: 6, mt: 2.5 }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => setOpenDialogCreate(true)}
                        >
                            Criar Papel
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

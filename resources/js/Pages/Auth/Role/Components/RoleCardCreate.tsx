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
                width: 300,
                maxWidth: '100%',
                height: 140,
                backgroundColor: '#FFF',
                margin: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <CardContent>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid sx={{ xs: 6 }}>
                        <AssignmentIndIcon
                            sx={{ fontSize: 90, color: 'primary' }}
                        />
                    </Grid>
                    <Grid sx={{ xs: 6, mt: 2.5 }}>
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

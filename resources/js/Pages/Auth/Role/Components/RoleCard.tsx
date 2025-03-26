import {
    Avatar,
    AvatarGroup,
    Card,
    CardContent,
    Grid2 as Grid,
    Link,
    Typography,
    useTheme,
} from '@mui/material';

interface UserProps {
    id: number;
    name: string;
    avatar?: string;
}

interface UserCardProps {
    users?: UserProps[];
    role: string;
    handleRole: () => void;
}
export const RoleCard: React.FC<UserCardProps> = ({
    users,
    role,
    handleRole,
}) => {
    const theme = useTheme();

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
                <Grid container spacing={2}>
                    <Grid sx={{ xs: 6 }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                        >
                            {users?.length} {}
                            {users?.length === 1 ? 'Usuário' : 'Usuários'}
                        </Typography>
                    </Grid>
                    <Grid sx={{ xs: 6 }}>
                        <AvatarGroup max={4}>
                            {users?.map((user) => (
                                <Avatar
                                    key={user.id}
                                    alt={user.name}
                                    src={user.avatar || undefined}
                                    sx={{ width: 32, height: 32 }}
                                >
                                    {!user.avatar && user.name[0].toUpperCase()}
                                </Avatar>
                            ))}
                        </AvatarGroup>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid
                        container
                        justifyContent="flex-start"
                        sx={{ xs: 6, mt: 1 }}
                    >
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{
                                mt: 0.5,
                                color: theme.palette.secondary.main,
                            }}
                        >
                            {role}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        justifyContent="flex-end"
                        sx={{ xs: 6, mt: 1 }}
                    >
                        <Link
                            onClick={handleRole}
                            underline="none"
                            color="primary"
                            component="button"
                        >
                            Editar Papel
                        </Link>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

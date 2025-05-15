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
    handleRoleEdit?: () => void;
    handleRoleDelete?: () => void;
}
export const RoleCard: React.FC<UserCardProps> = ({
    users,
    role,
    handleRoleEdit,
    handleRoleDelete,
}) => {
    const theme = useTheme();
    console.log(handleRoleEdit);
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
                            {users && users?.length > 1
                                ? 'Usuários'
                                : 'Usuário'}
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
                <Grid container columns={2} spacing={2} sx={{ mt: 1 }}>
                    <Grid sx={{ xs: 6, mt: 3 }}>
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
                    {handleRoleEdit !== undefined ||
                    handleRoleDelete !== undefined ? (
                        <Grid sx={{ xs: 6, mt: 2 }}>
                            <Grid container direction="column" spacing={1}>
                                {handleRoleEdit !== undefined && (
                                    <Grid>
                                        <Link
                                            onClick={handleRoleEdit}
                                            underline="none"
                                            color="primary"
                                            component="button"
                                        >
                                            Editar Papel
                                        </Link>
                                    </Grid>
                                )}
                                {handleRoleDelete !== undefined && (
                                    <Grid>
                                        <Link
                                            onClick={handleRoleDelete}
                                            underline="none"
                                            color="error.main"
                                            component="button"
                                        >
                                            Excluir Papel
                                        </Link>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    ) : null}
                </Grid>
            </CardContent>
        </Card>
    );
};

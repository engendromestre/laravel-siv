import { IUser } from '@/types/Auth';
import {
    Avatar,
    Card,
    CardContent,
    Grid2 as Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';
import React from 'react';

interface UserProfileProps {
    user: IUser;
}

const UserRoleProfile: React.FC<UserProfileProps> = ({ user }) => {
    const { name, email, roles, permissions } = user;

    return (
        <Card sx={{ maxWidth: 700, margin: 'auto', marginTop: 5 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid sx={{ xs: 12, sm: 6 }}>
                        <Avatar alt={name} sx={{ width: 50, height: 50 }}>
                            {name.charAt(0).toUpperCase()}
                        </Avatar>
                    </Grid>
                    <Grid sx={{ xs: 12, sm: 6 }}>
                        <Typography variant="h5" sx={{ marginBottom: 2 }}>
                            {name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            align="right"
                            sx={{ marginBottom: 2 }}
                        >
                            {email}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid sx={{ xs: 12, sm: 12 }}>
                        <List dense>
                            {roles.length > 0 ? (
                                roles.map((role) => (
                                    <ListItem key={role.id}>
                                        <ListItemText
                                            primary={role.name}
                                            secondary={
                                                role.permissions.length > 0
                                                    ? role.permissions
                                                          .map((p) => p.name)
                                                          .join(', ')
                                                    : ''
                                            }
                                        />
                                    </ListItem>
                                ))
                            ) : permissions.length > 0 ? (
                                <ListItem>
                                    <ListItemText
                                        primary="Permissões"
                                        secondary={permissions
                                            .map((p) => p.name)
                                            .join(', ')}
                                    />
                                </ListItem>
                            ) : (
                                <ListItem>
                                    <ListItemText
                                        primary="Nenhum papel ou permissão definida!"
                                        sx={{ color: 'error.main' }}
                                    />
                                </ListItem>
                            )}
                        </List>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default UserRoleProfile;

import CardProj from '@/Components/CardProj';
import PasswordStrengthMeter from '@/Components/PasswordStrenghMeter';
import { useForm } from '@inertiajs/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import React, { FormEventHandler, useRef } from 'react';

export default function UpdatePasswordForm() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const theme = useTheme();

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const { enqueueSnackbar } = useSnackbar();
    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                enqueueSnackbar('Senha atualizada com sucesso!', {
                    variant: 'success',
                });
            },
            onError: (errors) => {
                enqueueSnackbar('Erro ao atualizar a senha!', {
                    variant: 'error',
                });

                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <CardProj variant="outlined">
            <Typography
                component="p"
                variant="body1"
                gutterBottom
                sx={{
                    mb: 4,
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                }}
            >
                Certifique-se de que sua conta está usando uma senha longa e
                aleatória para se manter segura.
            </Typography>
            <Box
                component="form"
                onSubmit={updatePassword}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                }}
            >
                <FormControl
                    variant="outlined"
                    error={!!errors.current_password}
                    fullWidth
                >
                    <InputLabel htmlFor="current_password">
                        Senha Atual *
                    </InputLabel>
                    <OutlinedInput
                        id="current_password"
                        ref={currentPasswordInput}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        value={data.current_password}
                        required
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword
                                            ? 'hide the current password'
                                            : 'display the current password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Senha Atual"
                    />
                    {errors.current_password && (
                        <FormHelperText>
                            {errors.current_password}
                        </FormHelperText>
                    )}
                </FormControl>

                <FormControl
                    variant="outlined"
                    error={!!errors.password}
                    fullWidth
                >
                    <InputLabel htmlFor="password">Nova Senha *</InputLabel>
                    <OutlinedInput
                        id="password"
                        inputRef={passwordInput}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        value={data.password}
                        required
                        onChange={(e) => setData('password', e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword
                                            ? 'hide the new password'
                                            : 'display the new password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Nova Senha"
                    />
                    {errors.password && (
                        <FormHelperText>{errors.password}</FormHelperText>
                    )}
                </FormControl>

                <PasswordStrengthMeter password={data.password} />

                <FormControl
                    variant="outlined"
                    error={!!errors.password_confirmation}
                    fullWidth
                >
                    <InputLabel htmlFor="password">
                        Confirmar Senha *
                    </InputLabel>
                    <OutlinedInput
                        id="password_confirmation"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        autoComplete="new-password"
                        value={data.password_confirmation}
                        required
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword
                                            ? 'hide the password confirmation'
                                            : 'display the password confirmation'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirmação de Senha"
                    />
                    {errors.password_confirmation && (
                        <FormHelperText>
                            {errors.password_confirmation}
                        </FormHelperText>
                    )}
                </FormControl>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Box
                        component="button"
                        disabled={processing}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            padding: '8px 16px',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            '&:disabled': {
                                backgroundColor:
                                    theme.palette.action.disabledBackground,
                                color: theme.palette.action.disabled,
                                cursor: 'not-allowed',
                            },
                        }}
                    >
                        Salvar
                    </Box>
                </Box>
            </Box>
        </CardProj>
    );
}

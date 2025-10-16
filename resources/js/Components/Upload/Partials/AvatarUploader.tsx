import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';

interface AvatarUploaderProps {
    onImageChange: (image: File | string | null) => void;
    selectedImage: File | null;
    imagePreview?: string | null;
    error: string | undefined;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
    onImageChange,
    selectedImage,
    imagePreview,
    error,
}) => {
    const theme = useTheme();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [localPreview, setLocalPreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size <= 3 * 1024 * 1024) {
                const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                if (!validTypes.includes(file.type)) {
                    alert(
                        'Tipo de arquivo não permitido. Use JPEG, JPG ou PNG.',
                    );
                    return;
                }

                onImageChange(file);
            } else {
                alert('O arquivo deve ter no máximo 3MB.');
            }
        }

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const handleDelete = () => {
        onImageChange(null);
        setLocalPreview(null);
    };

    // Gera preview local quando selectedImage muda
    useEffect(() => {
        if (selectedImage) {
            const objectUrl = URL.createObjectURL(selectedImage);
            setLocalPreview(objectUrl);

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        } else {
            setLocalPreview(null);
        }
    }, [selectedImage]);

    // Cleanup dos object URLs
    useEffect(() => {
        return () => {
            if (localPreview) {
                URL.revokeObjectURL(localPreview);
            }
        };
    }, [localPreview]);

    const displayPreview = imagePreview || localPreview;

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 190,
                    height: 190,
                    margin: 'auto',
                    padding: 1,
                    borderRadius: '50%',
                    boxShadow: 2,
                    bgcolor: error
                        ? theme.palette.error.light
                        : theme.palette.background.paper,
                    border: error
                        ? `2px solid ${theme.palette.error.main}`
                        : `1px solid ${theme.palette.divider}`,
                    transition: 'all 0.3s ease',
                }}
            >
                <Box
                    component="label"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `2px dashed ${displayPreview ? 'transparent' : theme.palette.primary.main}`,
                        borderRadius: '50%',
                        width: 160,
                        height: 160,
                        cursor: 'pointer',
                        margin: 'auto',
                        backgroundColor: displayPreview
                            ? 'transparent'
                            : theme.palette.action.hover,
                        '&:hover': {
                            backgroundColor: displayPreview
                                ? 'transparent'
                                : theme.palette.action.selected,
                            border: `2px dashed ${theme.palette.primary.dark}`,
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    <Avatar
                        sx={{
                            width: 150,
                            height: 150,
                            backgroundColor: displayPreview
                                ? 'transparent'
                                : theme.palette.action.disabledBackground,
                            boxShadow: displayPreview ? 1 : 0,
                            overflow: 'hidden',
                            border: displayPreview
                                ? `1px solid ${theme.palette.divider}`
                                : 'none',
                        }}
                    >
                        {displayPreview ? (
                            <img
                                src={displayPreview}
                                alt="Preview"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                }}
                            />
                        ) : (
                            <AddAPhotoIcon
                                sx={{
                                    color: theme.palette.primary.main,
                                    fontSize: 40,
                                    opacity: 0.7,
                                }}
                            />
                        )}
                    </Avatar>
                    <input
                        type="file"
                        accept=".jpeg,.jpg,.png"
                        hidden
                        onChange={handleFileChange}
                        ref={inputRef}
                    />
                </Box>
            </Box>

            {/* Botão de deletar - aparece quando há imagem */}
            {(displayPreview || selectedImage) && (
                <IconButton
                    onClick={handleDelete}
                    sx={{
                        mt: 2,
                        backgroundColor: theme.palette.error.main,
                        color: theme.palette.error.contrastText,
                        '&:hover': {
                            backgroundColor: theme.palette.error.dark,
                        },
                        boxShadow: 1,
                    }}
                    size="small"
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            )}

            {/* Mensagem de erro */}
            {error && (
                <Box sx={{ mt: 1, px: 1 }}>
                    <span
                        style={{
                            color: theme.palette.error.main,
                            fontSize: '0.75rem',
                            textAlign: 'center',
                            display: 'block',
                            fontWeight: theme.typography.fontWeightMedium,
                        }}
                    >
                        {error}
                    </span>
                </Box>
            )}

            {/* Texto de ajuda */}
            {!displayPreview && !selectedImage && (
                <Box sx={{ mt: 1, px: 1 }}>
                    <span
                        style={{
                            color: theme.palette.text.secondary,
                            fontSize: '0.75rem',
                            textAlign: 'center',
                            display: 'block',
                        }}
                    >
                        Clique para adicionar foto
                    </span>
                </Box>
            )}
        </Box>
    );
};

export default AvatarUploader;

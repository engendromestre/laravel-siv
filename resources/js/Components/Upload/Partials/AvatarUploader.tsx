import { gray } from '@/theme/themePrimitives';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';

interface AvatarUploaderProps {
    onImageChange: (image: File | null) => void;
    selectedImage: File | null;
    error: string | undefined;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
    onImageChange,
    selectedImage,
    error,
}) => {
    const theme = useTheme();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.size <= 3 * 1024 * 1024) {
            onImageChange(null);
            // Reinicia o valor do erro (caso esteja sendo controlado externamente)
            // Para limpar o erro, considere utilizar um setter no componente pai
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    onImageChange(file); // envia o file para o componente pai
                }
            };
            reader.readAsDataURL(file);
        } else {
            alert('O arquivo deve ter no máximo 3MB.');
        }

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    useEffect(() => {
        if (selectedImage) {
            const objectUrl = URL.createObjectURL(selectedImage);
            setPreviewUrl(objectUrl);
            return () => {
                URL.revokeObjectURL(objectUrl);
                setPreviewUrl(null);
            };
        } else {
            setPreviewUrl(null);
        }
    }, [selectedImage]);

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
                    boxShadow: 3,
                    bgcolor: error
                        ? theme.palette.error.light
                        : theme.palette.primary.light,
                }}
            >
                <Box
                    component="label"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `2px solid ${gray[100]}`,
                        borderRadius: '50%',
                        width: 160,
                        height: 160,
                        cursor: 'pointer',
                        margin: 'auto',
                        '&:hover': { backgroundColor: '#fff' },
                    }}
                >
                    <Avatar
                        sx={{
                            width: 150,
                            height: 150,
                            backgroundColor: '#e0e0e0',
                            boxShadow: 3,
                            overflow: 'hidden',
                        }}
                    >
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Selected"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    transition: 'opacity 0.3s ease-in-out',
                                    opacity: previewUrl ? 1 : 0,
                                }}
                            />
                        ) : (
                            <AddAPhotoIcon sx={{ color: '#757575' }} />
                        )}
                    </Avatar>
                    <input
                        type="file"
                        accept=".jpeg,.jpg,.png,.gif"
                        hidden
                        onChange={handleFileChange}
                        ref={inputRef}
                    />
                </Box>
            </Box>
            {selectedImage && (
                <IconButton onClick={() => onImageChange(null)} sx={{ mt: 1 }}>
                    <DeleteIcon color="error" />
                </IconButton>
            )}
        </Box>
    );
};

export default AvatarUploader;

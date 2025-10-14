import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CardProj from '../CardProj';
import AvatarUploader from './Partials/AvatarUploader';
import PhotoCaptureDialog from './Partials/PhotoCaptureDialog';

interface PatientFormData {
    photo: string;
}

type FormErrors = Partial<Record<keyof PatientFormData, string | string[]>>;

const UploadPhoto: React.FC<{
    onImageChange: (image: File | null) => void;
    errors: FormErrors;
    initialImage?: string;
}> = ({ onImageChange, errors, initialImage }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [hasCamera, setHasCamera] = useState<boolean | null>(null);
    const [openCamera, setOpenCamera] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const checkCameraAvailability = async () => {
        setLoading(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            stream.getTracks().forEach((track) => track.stop());

            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(
                (device) => device.kind === 'videoinput',
            );
            setHasCamera(videoDevices.length > 0);
        } catch (error) {
            console.error('Erro ao acessar a câmera:', error);
            setHasCamera(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkCameraAvailability();
    }, []);

    useEffect(() => {
        const imageUrl = `/${initialImage}`;
        if (initialImage) {
            fetch(imageUrl)
                .then((response) => {
                    if (response.ok) {
                        return response.blob();
                    } else if (response.status === 403) {
                        setSelectedImage(null);
                        onImageChange(null);
                        return null;
                    } else {
                        throw new Error(
                            `Erro ao carregar a imagem: ${response.statusText}`,
                        );
                    }
                })
                .then((blob) => {
                    if (blob) {
                        const file = new File([blob], 'photo.jpg', {
                            type: blob.type,
                        });
                        setSelectedImage(file);
                        onImageChange(file);
                    }
                });
        }
    }, [initialImage, onImageChange]);

    const gerarNomeUnico = () => {
        return `${uuidv4()}.jpg`;
    };

    const handleImageChange = (image: File | string | null) => {
        if (typeof image === 'string') {
            const nomeImagem = gerarNomeUnico();
            const file = dataURLtoFile(image, `${nomeImagem}`);
            setSelectedImage(file);
            onImageChange(file);
        } else {
            setSelectedImage(image);
            onImageChange(image);
        }
    };

    const dataURLtoFile = (dataUrl: string, filename: string) => {
        const arr = dataUrl.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
        if (!mimeMatch) return null;

        const mime = mimeMatch[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    };

    return (
        <CardProj
            variant="outlined"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                p: 3,
                textAlign: 'center',
                minHeight: 430,
            }}
        >
            <AvatarUploader
                selectedImage={selectedImage}
                onImageChange={handleImageChange}
                error={errors?.photo as string | undefined}
            />

            {errors.photo && (
                <Typography variant="body2" color="error" textAlign="center">
                    {errors.photo}
                </Typography>
            )}

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
            >
                <Button
                    variant="contained"
                    startIcon={<CameraAltIcon />}
                    onClick={() => setOpenCamera(true)}
                    sx={{ mt: 2 }}
                    disabled={hasCamera === false}
                >
                    Tirar Foto
                </Button>

                {!hasCamera && (
                    <Typography
                        variant="body2"
                        color="error"
                        textAlign="center"
                        sx={{ width: '100%' }}
                    >
                        Nenhuma câmera detectada ou permissão negada. Verifique
                        as configurações do navegador.
                    </Typography>
                )}

                <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={checkCameraAvailability}
                    disabled={loading}
                    sx={{ py: 4 }}
                >
                    {loading ? 'Verificando...' : 'Reverificar Câmera'}
                </Button>
            </Box>

            <Typography
                variant="body2"
                color="textSecondary"
                textAlign="center"
                sx={{ mt: 1 }}
            >
                Extensões Permitidas: <br />
                <strong>*.jpeg, *.jpg, *.png</strong>
            </Typography>
            <Typography
                variant="body2"
                color="textSecondary"
                textAlign="center"
            >
                Tamanho máximo de <strong>3 Mb</strong>
            </Typography>

            <PhotoCaptureDialog
                open={openCamera}
                onClose={() => setOpenCamera(false)}
                onCapture={handleImageChange}
            />
        </CardProj>
    );
};

export default UploadPhoto;

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CardProj from '../CardProj';
import AvatarUploader from './Partials/AvatarUploader';
import PhotoCaptureDialog from './Partials/PhotoCaptureDialog';

const UploadPhoto: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [hasCamera, setHasCamera] = useState<boolean | null>(null);
    const [openCamera, setOpenCamera] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const checkCameraAvailability = async () => {
        setLoading(true);
        try {
            console.log('Verificando acesso à câmera...');

            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            stream.getTracks().forEach((track) => track.stop()); // Fecha o stream após verificar

            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(
                (device) => device.kind === 'videoinput',
            );

            console.log('Câmeras detectadas:', videoDevices.length);
            setHasCamera(videoDevices.length > 0);
        } catch (error) {
            console.error('Erro ao acessar a câmera:', error);
            setHasCamera(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkCameraAvailability(); // Chama a verificação diretamente
    }, []);

    return (
        <CardProj variant="outlined">
            <AvatarUploader
                selectedImage={selectedImage}
                onImageChange={setSelectedImage}
            />

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
                    disabled={hasCamera === false} // Desabilita se não houver câmera
                >
                    Tirar Foto
                </Button>

                {!hasCamera && (
                    <Typography variant="body2" color="error">
                        Nenhuma câmera detectada ou permissão negada. Verifique
                        as configurações do navegador.
                    </Typography>
                )}

                <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={checkCameraAvailability}
                    disabled={loading}
                >
                    {loading ? 'Verificando...' : 'Reverificar Câmera'}
                </Button>
            </Box>

            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Extensões Permitidas: <strong>*.jpeg, *.jpg, *.png</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Tamanho máximo de <strong>3 Mb</strong>
            </Typography>

            <PhotoCaptureDialog
                open={openCamera}
                onClose={() => setOpenCamera(false)}
                onCapture={setSelectedImage}
            />
        </CardProj>
    );
};

export default UploadPhoto;

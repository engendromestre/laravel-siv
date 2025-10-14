import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Slider,
} from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface PhotoCaptureDialogProps {
    open: boolean;
    onClose: () => void;
    onCapture: (image: string) => void;
}

const PhotoCaptureDialog: React.FC<PhotoCaptureDialogProps> = ({
    open,
    onClose,
    onCapture,
}) => {
    const webcamRef = useRef<Webcam>(null);
    const [zoom, setZoom] = useState(1.5);
    const [countdown, setCountdown] = useState(0);
    const [isCameraReady, setIsCameraReady] = useState(false);

    // 🚀 Reinicia o estado da câmera quando o modal abre
    useEffect(() => {
        if (open) {
            setIsCameraReady(false);
        }
    }, [open]);

    const handleCapture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) onCapture(imageSrc);
        }
        onClose();
    }, [onCapture, onClose]);

    const startCountdownAndCapture = useCallback(() => {
        setCountdown(3);
        const intervalId = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(intervalId);
                    handleCapture();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, [handleCapture]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 3, p: 1, overflow: 'hidden' },
            }}
        >
            <DialogContent>
                <Box
                    sx={{
                        width: 320,
                        height: 320,
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        backgroundColor: '#000',
                        borderRadius: '50%', // deixa o preview circular
                    }}
                >
                    {/* 🟢 Só renderiza a webcam se o diálogo estiver aberto */}
                    {open && (
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                width: 1280,
                                height: 720,
                                facingMode: 'user',
                            }}
                            onUserMedia={() => setIsCameraReady(true)}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transform: `scale(${zoom})`,
                                transformOrigin: 'center',
                                borderRadius: '50%',
                            }}
                        />
                    )}

                    {/* Exibe contador de 3 segundos */}
                    {countdown > 0 && (
                        <Box
                            sx={{
                                position: 'absolute',
                                fontSize: '4rem',
                                fontWeight: 'bold',
                                color: 'white',
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                            }}
                        >
                            {countdown}
                        </Box>
                    )}

                    {/* Mensagem se a câmera ainda não estiver pronta */}
                    {!isCameraReady && (
                        <Box
                            sx={{
                                position: 'absolute',
                                color: 'white',
                                fontSize: '1rem',
                                textAlign: 'center',
                            }}
                        >
                            Iniciando câmera...
                        </Box>
                    )}
                </Box>

                {/* Slider de zoom */}
                <Box sx={{ mt: 2 }}>
                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={(_, newValue) => setZoom(newValue as number)}
                        valueLabelDisplay="auto"
                        aria-label="Zoom"
                    />
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 3,
                    pb: 2,
                }}
            >
                <Button onClick={onClose} color="secondary">
                    Cancelar
                </Button>
                <Button
                    onClick={startCountdownAndCapture}
                    color="primary"
                    variant="contained"
                >
                    Capturar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PhotoCaptureDialog;

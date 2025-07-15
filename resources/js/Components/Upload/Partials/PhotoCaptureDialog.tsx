import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Slider,
} from '@mui/material';
import { useCallback, useRef, useState } from 'react';
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

    const handleCapture = useCallback(() => {
        if (webcamRef.current && webcamRef.current.video) {
            const video = webcamRef.current.video;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Define o canvas com base na resolução do vídeo e zoom
            canvas.width = video.videoWidth / zoom;
            canvas.height = video.videoHeight / zoom;

            if (ctx) {
                // Desenha a imagem, centralizando a captura
                ctx.drawImage(
                    video,
                    (video.videoWidth - canvas.width) / 2,
                    (video.videoHeight - canvas.height) / 2,
                    canvas.width,
                    canvas.height,
                    0,
                    0,
                    canvas.width,
                    canvas.height,
                );
                // Converte para JPEG com qualidade 0.9
                const imageSrc = canvas.toDataURL('image/jpeg', 0.9);
                onCapture(imageSrc);
            }
        }
        onClose();
    }, [onCapture, onClose, zoom]);

    // Função para iniciar o countdown antes da captura
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
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <Box
                    sx={{
                        width: 300,
                        height: 300,
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            width: { ideal: 1920, min: 1280, max: 1920 },
                            height: { ideal: 1080, min: 720, max: 1080 },
                            facingMode: 'user',
                        }}
                        style={{
                            transform: `scale(${zoom})`,
                            transformOrigin: 'center',
                            position: 'absolute',
                        }}
                    />
                    {countdown > 0 && (
                        <Box
                            sx={{
                                position: 'absolute',
                                fontSize: '4rem',
                                fontWeight: 'bold',
                                color: 'white',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {countdown}
                        </Box>
                    )}
                </Box>
                {/* Slider para ajuste dinâmico do zoom */}
                <Box sx={{ mt: 2 }}>
                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={(e, newValue) => setZoom(newValue as number)}
                        valueLabelDisplay="auto"
                        aria-label="Zoom"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
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

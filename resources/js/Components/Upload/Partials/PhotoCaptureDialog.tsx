import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
} from '@mui/material';
import { useCallback, useRef } from 'react';
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
    const zoom = 1.5;

    const handleCapture = useCallback(() => {
        if (webcamRef.current) {
            const video = webcamRef.current.video;
            if (video) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = video.videoWidth / zoom;
                canvas.height = video.videoHeight / zoom;

                if (ctx) {
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
                    onCapture(canvas.toDataURL('image/jpeg'));
                }
                onClose();
            }
        }
    }, [onCapture, onClose]);

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
                            width: 1920,
                            height: 1080,
                            facingMode: 'user',
                        }}
                        style={{
                            transform: `scale(${zoom})`,
                            transformOrigin: 'center',
                            position: 'absolute',
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancelar
                </Button>
                <Button
                    onClick={handleCapture}
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

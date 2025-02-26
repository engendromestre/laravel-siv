import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControlLabel,
    IconButton,
    Switch,
    Typography,
} from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const CustomUploadPhotoComponent: React.FC = () => {
    const [emailVerified, setEmailVerified] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [openCamera, setOpenCamera] = useState<boolean>(false);
    const webcamRef = useRef<Webcam>(null);
    const zoom = 1.5;

    const handleToggle = () => {
        setEmailVerified(!emailVerified);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.size <= 3 * 1024 * 1024) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setSelectedImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        } else {
            alert('O arquivo deve ter no máximo 3MB.');
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

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
                    setSelectedImage(canvas.toDataURL('image/jpeg'));
                }
                setOpenCamera(false);
            }
        }
    }, [webcamRef]);

    return (
        <Box
            sx={{
                maxWidth: 350,
                margin: 'auto',
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
                textAlign: 'center',
                bgcolor: 'background.paper',
            }}
        >
            <Box
                component="label"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed #bdbdbd',
                    borderRadius: '50%',
                    width: 100,
                    height: 100,
                    cursor: 'pointer',
                    margin: 'auto',
                    '&:hover': { backgroundColor: '#f0f0f0' },
                }}
            >
                <Avatar
                    sx={{ width: 100, height: 100, backgroundColor: '#e0e0e0' }}
                >
                    {selectedImage ? (
                        <img
                            src={selectedImage}
                            alt="Selected"
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
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
                />
            </Box>
            {selectedImage && (
                <IconButton onClick={handleRemoveImage} sx={{ mt: 1 }}>
                    <DeleteIcon color="error" />
                </IconButton>
            )}
            <Button
                variant="contained"
                startIcon={<CameraAltIcon />}
                onClick={() => setOpenCamera(true)}
                sx={{ mt: 2 }}
            >
                Tirar Foto
            </Button>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Allowed *.jpeg, *.jpg, *.png, *.gif
            </Typography>
            <Typography variant="body2" color="textSecondary">
                max size of 3 Mb
            </Typography>
            <FormControlLabel
                control={
                    <Switch checked={emailVerified} onChange={handleToggle} />
                }
                label="Email verified"
                sx={{ mt: 2 }}
            />
            <Typography variant="caption" color="textSecondary">
                Disabling this will automatically send the user a verification
                email
            </Typography>

            {/* Modal para Captura de Foto */}
            <Dialog open={openCamera} onClose={() => setOpenCamera(false)}>
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
                    <Button
                        onClick={() => setOpenCamera(false)}
                        color="secondary"
                    >
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
        </Box>
    );
};

export default CustomUploadPhotoComponent;

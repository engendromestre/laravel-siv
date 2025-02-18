import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import CardProj from '../CardProj';
import AvatarUploader from './Partials/AvatarUploader';
import PhotoCaptureDialog from './Partials/PhotoCaptureDialog';

const UploadPhotoComponent: React.FC = () => {
    // const [emailVerified, setEmailVerified] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [openCamera, setOpenCamera] = useState<boolean>(false);

    const handleImageChange = (image: string | null) => {
        console.log('Image changed:', image); // Verificar se a imagem está sendo corretamente alterada
        setSelectedImage(image);
    };

    return (
        <CardProj variant="outlined">
            <AvatarUploader
                selectedImage={selectedImage}
                onImageChange={handleImageChange}
            />

            <Button
                variant="contained"
                startIcon={<CameraAltIcon />}
                onClick={() => setOpenCamera(true)}
                sx={{ mt: 2 }}
            >
                Tirar Foto
            </Button>

            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Extensões Permitidas: <strong>*.jpeg, *.jpg, *.png</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Tamanho máximo de <strong>3 Mb</strong>
            </Typography>

            {/* <EmailVerificationSwitch
                emailVerified={emailVerified}
                onToggle={() => setEmailVerified(!emailVerified)}
            /> */}

            <PhotoCaptureDialog
                open={openCamera}
                onClose={() => setOpenCamera(false)}
                onCapture={setSelectedImage}
            />
        </CardProj>
    );
};

export default UploadPhotoComponent;

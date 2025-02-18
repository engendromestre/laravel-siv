import { FormControlLabel, Switch, Typography } from '@mui/material';

interface EmailVerificationSwitchProps {
    emailVerified: boolean;
    onToggle: () => void;
}

const EmailVerificationSwitch: React.FC<EmailVerificationSwitchProps> = ({
    emailVerified,
    onToggle,
}) => {
    return (
        <>
            <FormControlLabel
                control={<Switch checked={emailVerified} onChange={onToggle} />}
                label="Email verified"
                sx={{ mt: 2 }}
            />
            <Typography variant="caption" color="textSecondary">
                Disabling this will automatically send the user a verification
                email
            </Typography>
        </>
    );
};

export default EmailVerificationSwitch;

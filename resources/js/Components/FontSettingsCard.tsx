import {
    Card,
    CardContent,
    CardHeader,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import { useState } from 'react';

const FontSettingsCard = () => {
    const [fontFamily, setFontFamily] = useState('Roboto');

    const handleFontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFontFamily(event.target.value);
        document.body.style.fontFamily = event.target.value;
    };

    return (
        <Card>
            <CardHeader title="Font Settings" />
            <CardContent>
                <FormControl component="fieldset">
                    <RadioGroup
                        name="font-family"
                        value={fontFamily}
                        onChange={handleFontChange}
                    >
                        <FormControlLabel
                            value="Roboto"
                            control={<Radio />}
                            label="Roboto"
                        />
                        <FormControlLabel
                            value="Poppins"
                            control={<Radio />}
                            label="Poppins"
                        />
                        <FormControlLabel
                            value="Inter"
                            control={<Radio />}
                            label="Inter"
                        />
                    </RadioGroup>
                </FormControl>
            </CardContent>
        </Card>
    );
};

export default FontSettingsCard;

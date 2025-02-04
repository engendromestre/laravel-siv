import axios from 'axios';
import { useEffect, useState } from 'react';


export function usePasswordRules() {
    const [rules, setRules] = useState<string[]>([]);

    useEffect(() => {
        axios
            .get('/password-rules')
            .then((response) => {
                setRules(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return rules;
}
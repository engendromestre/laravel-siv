import { useIdleTimer } from '@/Hooks/useIdleTimer';
import { router, useForm } from '@inertiajs/react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { useEffect, useState } from 'react';

const IdleWarning = () => {
    const [open, setOpen] = useState(false);

    const timeout = 120 * 60 * 1000;
    const sessionLifetime = 1.2 * 60;
    const [secondsLeft, setSecondsLeft] = useState(sessionLifetime);

    const { post } = useForm();

    useIdleTimer({
        timeout,
        onIdle: () => {
            setOpen(true);
            setSecondsLeft(sessionLifetime);
        },
    });

    useEffect(() => {
        let logoutTimer: NodeJS.Timeout;
        let countdownTimer: NodeJS.Timeout;

        if (open) {
            logoutTimer = setTimeout(() => {
                post(route('logout'));
            }, sessionLifetime * 1000);

            countdownTimer = setInterval(() => {
                setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
        }

        return () => {
            clearTimeout(logoutTimer);
            clearInterval(countdownTimer);
        };
    }, [open]);

    const handleStayLoggedIn = () => {
        setOpen(false);
        setSecondsLeft(sessionLifetime);

        // Faz uma requisição para manter a sessão ativa
        router.post(route('keep-alive'), {}, { preserveScroll: true });
    };

    return (
        <Dialog open={open} onClose={handleStayLoggedIn}>
            <DialogTitle>Inatividade Detectada</DialogTitle>
            <DialogContent>
                <p>Sua sessão está prestes a expirar.</p>
                <p>
                    <strong>Tempo restante: {secondsLeft} segundos</strong>
                </p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleStayLoggedIn} color="primary">
                    Continuar Logado
                </Button>
                <Button onClick={() => post(route('logout'))} color="secondary">
                    Sair
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default IdleWarning;
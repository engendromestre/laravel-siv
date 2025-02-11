import { useEffect, useState, useRef } from "react";

interface IdleTimerProps {
    timeout: number; // Tempo de inatividade em milissegundos
    onIdle: () => void; // Função chamada quando o tempo expira
}

export const useIdleTimer = ({ timeout, onIdle }: IdleTimerProps) => {
    const [isIdle, setIsIdle] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimer = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsIdle(true);
            onIdle();
        }, timeout);
    };

    useEffect(() => {
        const events = ["mousemove", "keydown", "scroll", "click"];

        const handleEvent = () => {
            setIsIdle(false);
            resetTimer();
        };

        events.forEach((event) => window.addEventListener(event, handleEvent));
        resetTimer();

        return () => {
            events.forEach((event) => window.removeEventListener(event, handleEvent));
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return { isIdle };
};
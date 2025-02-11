import React, { useEffect, useState } from 'react';

const RedefinitionPasswordTimer: React.FC = () => {
    const initialTime = 3600; // 60 minutes in seconds
    const [timeLeft, setTimeLeft] = useState(() => {
        const savedTime = localStorage.getItem('timeLeft');
        return savedTime ? parseInt(savedTime, 10) : initialTime;
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = prevTime > 0 ? prevTime - 1 : 0;
                localStorage.setItem('timeLeft', newTime.toString());
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return <span>{formatTime(timeLeft)}</span>;
};

export default RedefinitionPasswordTimer;

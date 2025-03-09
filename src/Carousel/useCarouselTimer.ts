import { useEffect, useRef } from 'react';

type CarouselTimerProps = {
    callback: () => void;
    duration: number;
};

const useCarouselTimer = ({ callback, duration }: CarouselTimerProps) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const clearTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const startTimer = () => {
        clearTimer();

        timerRef.current = setInterval(() => {
            callbackRef.current();
        }, duration);
    };

    const resetTimer = () => {
        clearTimer();
        startTimer();
    };

    return { clearTimer, startTimer, resetTimer };
};

export default useCarouselTimer;

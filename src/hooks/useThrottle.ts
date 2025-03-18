import { useRef, useEffect, useCallback } from 'react';

const useThrottle = (fn: () => void, delay: number) => {
    const lastCallRef = useRef(0);
    const functionRef = useRef(fn);

    useEffect(() => {
        functionRef.current = fn;
    }, [fn]);

    return useCallback(
        (...args: Parameters<typeof fn>) => {
            const now = Date.now();
            if (now - lastCallRef.current >= delay) {
                functionRef.current(...args);
                lastCallRef.current = now;
            }
        },
        [delay]
    );
};

export default useThrottle;

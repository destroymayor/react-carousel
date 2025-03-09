export const resetTransition = (callback: () => void) => {
    const timer = setTimeout(() => {
        callback();
    }, 10);

    return () => clearTimeout(timer);
};

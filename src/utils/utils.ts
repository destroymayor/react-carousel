export const resetTransition = (callback: () => void, duration?: number) => {
    const durationValue = duration || 10;
    return new Promise((resolve) => {
        setTimeout(() => {
            callback();
            resolve(true);
        }, durationValue);
    });
};

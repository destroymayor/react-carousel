export const resetTransition = (callback: () => void, duration?: number) => {
    const durationValue = duration || 10;

    return new Promise((resolve) => {
       return setTimeout(() => {
            resolve(true);
            callback();
        }, durationValue);
    });
};

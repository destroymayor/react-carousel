export const executeWithDelay = async (
    callback: () => void,
    delayMs: number = 10
) => {
    try {
        await new Promise(resolve => setTimeout(resolve, delayMs));
        callback();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

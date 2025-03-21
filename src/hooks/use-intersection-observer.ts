import { useEffect, useState } from 'react';

type UseIntersectionObserverProps = {
    ref: React.RefObject<HTMLElement> | null;
    options: IntersectionObserverInit;
};

const useIntersectionObserver = (props: UseIntersectionObserverProps) => {
    const { ref, options = { threshold: 0.5 } } = props;
    const [isIntersecting, setIsIntersecting] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]): void => {
                const [entry] = entries;
                setIsIntersecting(entry.isIntersecting);
            },
            options
        );

        if (ref?.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref?.current) {
                observer.disconnect();
            }
        };
    }, []);

    return { isIntersecting };
};

export default useIntersectionObserver;

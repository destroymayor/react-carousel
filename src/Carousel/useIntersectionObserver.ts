import { useEffect, useRef, useState } from 'react';

type UseIntersectionObserverProps = {
    dependencies: Array<unknown>;
    options: IntersectionObserverInit;
};

const useIntersectionObserver = (props: UseIntersectionObserverProps) => {
    const { dependencies, options = { threshold: 0.5 } } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]): void => {
                const [entry] = entries;
                setIntersecting(entry.isIntersecting);
            },
            options
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.disconnect();
            }
        };
    }, [...dependencies]);

    return { containerRef, isIntersecting };
};

export default useIntersectionObserver;

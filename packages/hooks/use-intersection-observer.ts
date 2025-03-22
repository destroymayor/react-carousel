import { useEffect, useState, useRef } from 'react';

type UseIntersectionObserverProps = {
    options: IntersectionObserverInit;
};

const useIntersectionObserver = (props: UseIntersectionObserverProps) => {
    const { options = { threshold: 0.5 } } = props;
    const [isIntersecting, setIsIntersecting] = useState(true);

    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]): void => {
                const [entry] = entries;
                setIsIntersecting(entry.isIntersecting);
            },
            options
        );

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                observer.disconnect();
            }
        };
    }, []);

    return { targetRef, isIntersecting };
};

export default useIntersectionObserver;

import { useState, useEffect, useRef } from 'react';

type UseInViewOptions = {
    threshold?: number | number[];
    rootMargin?: string;
    once?: boolean;
};

const useInView = ({ threshold = 0, rootMargin = '0px', once = false }: UseInViewOptions = {}
) => {
    const ref = useRef(null);
    const [isInView, setInView] = useState(false);


    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const element = ref.current;

        if (!element) {
            return;
        }

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                const { isIntersecting } = entry;

                console.log({ isIntersecting });

                setInView(isIntersecting);

                if (isIntersecting && once) {
                    if (observerRef.current) {
                        observerRef.current.unobserve(element);
                    }
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        if (observerRef.current) {
            observerRef.current.observe(element);
        }

        return () => {
            if (element && observerRef.current) {
                observerRef.current.unobserve(element);
                observerRef.current.disconnect();
            }
        };
    }, [threshold, rootMargin, once]);

    return { ref, isInView };
};

export default useInView;

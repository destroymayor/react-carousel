import { useEffect } from 'react';
import { useCarouselStore } from './Provider';
import useCarouselTimer from './useCarouselTimer';
import { resetTransition } from './utils';

import useIntersectionObserver from './useIntersectionObserver';

const useCarousel = () => {
    const state = useCarouselStore((carouselState) => carouselState);

    const {
        isPlaying,
        isActing,
        isDragging,
        isTransitioning,
        totalSlides,
        activeSlide,
        speed,
        autoPlay,
        transitionDuration,
        scrollNext,
        playSlide,
        pauseSlide,
        setActiveSlide,
        setTransitioning,
        setAutoPlay,
        setActing,
    } = state;

    const { resetTimer, pauseTimer } = useCarouselTimer({
        callback: scrollNext,
        speed,
    });

    const { containerRef, isIntersecting } = useIntersectionObserver({
        dependencies: [autoPlay],
        options: { threshold: 0.5 },
    });

    useEffect(() => {
        if (isIntersecting) {
            setAutoPlay(true);
            playSlide();
        } else {
            setAutoPlay(false);
            pauseSlide();
        }
    }, [isIntersecting]);

    useEffect(() => {
        if (isTransitioning) return;

        if (activeSlide === 0) {
            const timer = setTimeout(() => {
                setTransitioning(true);
                setActiveSlide(totalSlides);

                resetTransition(() => setTransitioning(false));
            }, transitionDuration);

            return () => clearTimeout(timer);
        } else if (activeSlide - 1 >= totalSlides) {
            const timer = setTimeout(() => {
                setTransitioning(true);
                setActiveSlide(1);

                resetTransition(() => setTransitioning(false));
            }, transitionDuration);

            return () => clearTimeout(timer);
        }
    }, [activeSlide, totalSlides]);

    useEffect(() => {
        if (isActing) {
            pauseTimer();
            setActing(false);
            return;
        }

        if (!autoPlay) {
            pauseTimer();
            playSlide();
            return;
        }

        if (autoPlay && isPlaying && !isDragging && !isTransitioning) {
            resetTimer();
        }
    }, [isActing, autoPlay, isDragging, isTransitioning, isPlaying]);

    return { containerRef };
};

export default useCarousel;

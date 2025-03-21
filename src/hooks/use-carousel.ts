import { useEffect, useRef } from 'react';
import { useCarouselStore } from '../store/Provider';
import useCarouselTimer from './use-carousel-timer';
import { resetTransition } from '../utils';

import useIntersectionObserver from './use-intersection-observer';

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
        transitionDuration,
        scrollNext,
        playSlide,
        pauseSlide,
        setActiveSlide,
        setTransitioning,
        setActing,
    } = state;

    const containerRef = useRef(null);

    const { timerRef, startTimer, pauseTimer } = useCarouselTimer({
        callback: scrollNext,
        speed,
    });

    const { isIntersecting } = useIntersectionObserver({
        ref: containerRef,
        options: { threshold: 0.5 },
    });

    useEffect(() => {
        if (isActing) {
            pauseTimer();
            setActing(false);
            return;
        }

        if (isIntersecting) {
            if (!isPlaying &&!isDragging && !isTransitioning) {
                scrollNext();
                playSlide();
                startTimer();
            } else if (!timerRef.current) {
                startTimer();
            }
        } else {
            pauseTimer();
            pauseSlide();
        }
    }, [isIntersecting, isActing, isPlaying, isDragging, isTransitioning]);

    useEffect(() => {
        if (isTransitioning) return;

        if (activeSlide === 0) {
            resetTransition(() => {
                setTransitioning(true);
                setActiveSlide(totalSlides);

                resetTransition(() => setTransitioning(false));
            }, transitionDuration);
        } else if (activeSlide - 1 >= totalSlides) {
            resetTransition(() => {
                setTransitioning(true);
                setActiveSlide(1);

                resetTransition(() => setTransitioning(false));
            }, transitionDuration);
        }
    }, [activeSlide, totalSlides]);

    return { containerRef };
};

export default useCarousel;

import { useEffect } from 'react';
import { useCarouselStore } from '../store/Provider';
import useCarouselTimer from './use-carousel-timer';
import { executeWithDelay } from '../utils';

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

    const { timerRef, startTimer, pauseTimer } = useCarouselTimer({
        callback: scrollNext,
        speed,
    });

    const { targetRef: containerRef, isIntersecting } = useIntersectionObserver({
        options: { threshold: 0.5 },
    });

    useEffect(() => {
        if (isActing) {
            pauseTimer();
            setActing(false);
            return;
        }

        if (!isPlaying) {
            pauseTimer();
            pauseSlide();
            return;
        }

        if (isIntersecting) {
            if (!isPlaying && !isDragging && !isTransitioning) {
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

        const slideTransition = async (nextSlide: number) => {
            try {
                await executeWithDelay(() => {
                    setTransitioning(true);
                    setActiveSlide(nextSlide);
                }, transitionDuration);

                await executeWithDelay(() => {
                    setTransitioning(false);
                }, 10);
            } catch (error) {
                console.error(error);
                throw error;
            }
        };

        if (activeSlide === 0) {
            slideTransition(totalSlides);
        } else if (activeSlide - 1 >= totalSlides) {
            slideTransition(1);
        }
    }, [activeSlide, totalSlides]);

    return { containerRef };
};

export default useCarousel;

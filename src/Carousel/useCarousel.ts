import { useEffect } from 'react';
import { useCarouselStore } from './Provider';
import useCarouselTimer from './useCarouselTimer';
import { resetTransition } from './utils';

const useCarousel = () => {
    const state = useCarouselStore((carouselState) => carouselState);

    const {
        isPlaying,
        isDragging,
        isTransitioning,
        totalSlides,
        activeSlide,
        options,
        transitionDuration,
        scrollNext,
        playSlide,
        setActiveSlide,
        setTransitioning,
    } = state;
    const { speed } = options;

    const { resetTimer, clearTimer } = useCarouselTimer({
      callback: scrollNext,
      speed,
    })

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

        if (isPlaying && !isDragging && !isTransitioning) {
            resetTimer();
        }

        if (!isPlaying) {
            clearTimer();
            playSlide();
        }
    }, [isDragging, isTransitioning, isPlaying]);
};

export default useCarousel;

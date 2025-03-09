import React, { Children, useEffect } from 'react';

import { cn } from '@/lib/utils';
import { useCarouselStore } from './Provider';

import useCarousel from './useCarousel';
import useSwipe from './useSwipe';

type CarouselContentProps = {
    children?: React.ReactNode;
    className?: string;
};

const CarouselContent = (props: CarouselContentProps) => {
    const { children, className } = props;

    const {
        swipeable,
        isDragging,
        isTransitioning,
        activeSlide,
        totalSlides,
        orientation,
        scrollNext,
        scrollPrev,
        setDragging,
        setTotalSlides,
    } = useCarouselStore((state) => state);

    useCarousel();

    const {
        ref: carouselRef,
        swipeingTranslate,
        handlers: swipeHandlers,
    } = useSwipe({
        orientation,
        enabled: swipeable,
        isDragging,
        setDragging,
        onSwipeLeft: () => scrollPrev(),
        onSwipeRight: () => scrollNext(),
    });

    useEffect(() => setTotalSlides(Children.toArray(children).length), []);

    const clonedFirstChild = Children.toArray(children)[0];
    const clonedLastChild = Children.toArray(children)[totalSlides - 1];

    const isHorizontal = orientation === 'horizontal';

    const transform = isHorizontal
        ? `translateX(${-activeSlide * 100}%) translateX(${swipeingTranslate}px)`
        : `translateY(${-activeSlide* 100}%) translateY(${swipeingTranslate}px)`;

    return (
        <div className="overflow-hidden">
            <div
                ref={carouselRef}
                className={cn(
                    'touch-none',
                    'flex h-full w-full',
                    isHorizontal ? 'flex-row' : 'flex-col',
                    {
                        'transition-transform duration-300 ease-out': !isTransitioning,
                    },
                    className
                )}
                style={
                    {
                        transform,
                        height: carouselRef.current?.clientHeight,
                        width: carouselRef.current?.clientWidth,
                    } as React.CSSProperties
                }
                {...swipeHandlers}
            >
                {clonedLastChild}
                {children}
                {clonedFirstChild}
            </div>
        </div>
    );
};

export default CarouselContent;

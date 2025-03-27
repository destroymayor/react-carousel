import { Children, useLayoutEffect, useRef } from 'react';

import clsx from 'clsx';
import { useCarouselStore } from '../store/Provider';
import useCarousel from '../hooks/use-carousel';
import useSwipe from '../hooks/use-swipe';

import STYLE from './carousel-content.module.css';

type CarouselContentProps = {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    gap?: number;
};

const calculateTranslateX = (data: {
    containerSize?: number;
    slideSize: number;
    activeSlide: number;
    gap: number;
}) => {
    const { containerSize, activeSlide, slideSize, gap } = data;
    const itemGap = activeSlide * gap;

    if (!containerSize) return `-${activeSlide * 100}%`;
    const baseOffset = (containerSize - slideSize) / 2;

    return `${baseOffset - itemGap - slideSize * activeSlide}px`;
};

const CarouselContent = (props: CarouselContentProps) => {
    const { children, className, style, gap = 0 } = props;

    const {
        swipeable,
        isDragging,
        isTransitioning,
        activeSlide,
        totalSlides,
        orientation,
        transitionDuration,
        scrollNext,
        scrollPrev,
        setDragging,
        setTotalSlides,
    } = useCarouselStore((state) => state);

    const { containerRef } = useCarousel();
    const carouselRef = useRef<HTMLDivElement>(null);
    const { swipeingTranslate, handlers: swipeHandlers } = useSwipe({
        direction: orientation,
        enabled: swipeable,
        isDragging,
        setDragging,
        onSwipeLeft: () => scrollPrev(),
        onSwipeRight: () => scrollNext(),
    });

    useLayoutEffect(() => {
        setTotalSlides(Children.count(children));
    }, []);

    const carouselRoot = carouselRef.current?.parentNode?.parentElement;
    const slideWidth = carouselRef.current?.children[0].clientWidth || 0;
    const slideHeight = carouselRef.current?.children[0].clientHeight || 0;

    const isHorizontal = orientation === 'horizontal';

    const translateValue = calculateTranslateX({
        containerSize: isHorizontal
            ? carouselRoot?.offsetWidth
            : carouselRoot?.offsetHeight,
        slideSize: isHorizontal ? slideWidth : slideHeight,
        activeSlide,
        gap,
    });

    const transform = isHorizontal
        ? `translateX(${translateValue}) translateX(${swipeingTranslate}px)`
        : `translateY(${translateValue}) translateY(${swipeingTranslate}px)`;
    
    const clonedFirstChild = Children.toArray(children)[0];
    const clonedLastChild = Children.toArray(children)[totalSlides - 1];

    return (
        <div
            className={STYLE.wrapper}
            ref={containerRef}
            style={{ visibility: carouselRef.current ? 'visible' : 'hidden' }}
        >
            <div
                ref={carouselRef}
                className={clsx(
                    STYLE['wrapper-inner'],
                    isHorizontal
                        ? STYLE['wrapper-inner-horizontal']
                        : STYLE['wrapper-inner-vertical'],
                    className
                )}
                style={
                    {
                        gap,
                        transform,
                        transition: !isTransitioning
                            ? `transform ${transitionDuration}ms ease-in-out`
                            : 'none',
                        ...(isHorizontal
                            ? { width: `${carouselRoot?.offsetWidth}px` }
                            : { height: `${carouselRoot?.offsetHeight}px` }),
                        ...style,
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

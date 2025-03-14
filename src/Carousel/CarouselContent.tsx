import { Children, useLayoutEffect } from 'react';

import { useCarouselStore } from './Provider';
import useCarousel from './useCarousel';
import useSwipe from './useSwipe';

import STYLE from './CarouselContent.module.css';

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
        scrollNext,
        scrollPrev,
        setDragging,
        setTotalSlides,
    } = useCarouselStore((state) => state);

    const { containerRef } = useCarousel();

    const {
        ref: carouselRef,
        swipeingTranslate,
        handlers: swipeHandlers,
    } = useSwipe({
        direction: orientation,
        enabled: swipeable,
        isDragging,
        setDragging,
        onSwipeLeft: () => scrollPrev(),
        onSwipeRight: () => scrollNext(),
    });

    useLayoutEffect(() => {
        setTotalSlides(Children.count(children));
    }, [children]);

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
        <div className={STYLE.wrapper} ref={containerRef}>
            <div
                ref={carouselRef}
                className={[
                    STYLE['wrapper-inner'],
                    isHorizontal
                        ? STYLE['wrapper-inner-horizontal']
                        : STYLE['wrapper-inner-vertical'],
                    !isTransitioning ? STYLE['carousel-transition'] : '',
                    className,
                ].join(' ')}
                style={
                    {
                        transform,
                        gap,
                        ...(isHorizontal
                            ? { width: carouselRoot?.offsetWidth }
                            : { height: carouselRoot?.offsetHeight }),
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

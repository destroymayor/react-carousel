import { Children, useEffect } from 'react';

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
    containerWidth: number;
    slideWidth: number;
    activeSlide: number;
    gap: number;
}) => {
    const { containerWidth, activeSlide, slideWidth, gap } = data;
    const baseOffset = (containerWidth - slideWidth) / 2;
    const itemGap = activeSlide * gap;

    return baseOffset - itemGap - slideWidth * activeSlide;
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

    useCarousel();

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

    useEffect(() => setTotalSlides(Children.toArray(children).length), []);

    const clonedFirstChild = Children.toArray(children)[0];
    const clonedLastChild = Children.toArray(children)[totalSlides - 1];

    const isHorizontal = orientation === 'horizontal';
    const containerWidth = carouselRef.current?.offsetWidth || 0;
    const slideWidth = carouselRef.current?.children[0].clientWidth || 0;

    const translateValue = calculateTranslateX({
        containerWidth,
        slideWidth,
        activeSlide,
        gap,
    });
    const transform = isHorizontal
        ? `translateX(${translateValue}px) translateX(${swipeingTranslate}px)`
        : `translateY(${translateValue}%) translateY(${swipeingTranslate}px)`;

    return (
        <div className={STYLE.wrapper}>
            <div
                ref={carouselRef}
                className={[
                    STYLE['wrapper-inner'],
                    isHorizontal
                        ? STYLE['wrapper-inner-horizontal']
                        : STYLE['wrapper-inner-vertical'],
                    !isTransitioning ? STYLE['wrapper-inner-transition'] : '',
                    className,
                ].join(' ')}
                style={
                    {
                        transform,
                        gap,
                        height: carouselRef.current?.clientHeight,
                        width: carouselRef.current?.offsetWidth,
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

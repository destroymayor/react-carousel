import React, { Children, useEffect } from 'react'

import { useCarouselStore } from './Provider'
import useCarousel from './useCarousel'
import useSwipe from './useSwipe'

import STYLE from './CarouselContent.module.css'

type CarouselContentProps = {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const CarouselContent = (props: CarouselContentProps) => {
  const { children, className, style } = props

  const { swipeable, isDragging, isTransitioning, activeSlide, totalSlides, orientation, scrollNext, scrollPrev, setDragging, setTotalSlides } = useCarouselStore((state) => state)

  useCarousel()

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
  })

  useEffect(() => setTotalSlides(Children.toArray(children).length), [])

  const clonedFirstChild = Children.toArray(children)[0]
  const clonedLastChild = Children.toArray(children)[totalSlides - 1]

  const isHorizontal = orientation === 'horizontal'

  const transform = isHorizontal ? `translateX(${-activeSlide * 100}%) translateX(${swipeingTranslate}px)` : `translateY(${-activeSlide * 100}%) translateY(${swipeingTranslate}px)`

  return (
    <div className={STYLE.wrapper}>
      <div
        ref={carouselRef}
        className={[
          STYLE['wrapper-inner'],
          isHorizontal ? STYLE['wrapper-inner-horizontal'] : STYLE['wrapper-inner-vertical'],
          !isTransitioning ? STYLE['wrapper-inner-transition'] : '',
          className,
        ].join(' ')}
        style={
          {
            transform,
            height: carouselRef.current?.clientHeight,
            width: carouselRef.current?.clientWidth,
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
  )
}

export default CarouselContent

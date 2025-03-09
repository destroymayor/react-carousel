import { useCarouselStore } from './Provider'

import STYLE from './CarouselPagination.module.css'

type CarouselPaginationProps = {
  className?: string
  style?: React.CSSProperties
}

const CarouselPagination = (props: CarouselPaginationProps) => {
  const { className, style } = props
  const { activeSlide, totalSlides } = useCarouselStore((state) => state)

  return (
    <div className={[STYLE['wrapper'], className].join(' ')} style={style}>
      {Array.from({ length: totalSlides }).map((_, index) => {
        const isActive = activeSlide - 1 === index

        return <div key={index} className={[STYLE['pagination-item'], isActive ? STYLE['pagination-item-active'] : ''].join(' ')} />
      })}
    </div>
  )
}

export default CarouselPagination

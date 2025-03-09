import { useCarouselStore } from './Provider'

import STYLE from './CarouselBars.module.css'

type CarouselBarProps = {
  completed: boolean
  active: boolean
  duration: number
}

const CarouselBar = (props: CarouselBarProps) => {
  const { active, duration, completed } = props

  return (
    <div className={STYLE['bar-item-wrapper']}>
      <div
        className={[STYLE['bar-item-wrapper-inner'], active ? STYLE['bar-progress-animation'] : ''].join(' ')}
        style={{
          animationDuration: `${duration}ms`,
          transform: completed ? 'translateX(0)' : 'translateX(-100%)',
        }}
      />
    </div>
  )
}

const CarouselBars = (props: { className?: string }) => {
  const { className } = props
  const { activeSlide, duration, totalSlides } = useCarouselStore((state) => state)

  const activeBar = activeSlide - 1

  return (
    <div className={[STYLE['bars-wrapper'], className].join(' ')}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <CarouselBar key={index} active={index === activeBar} completed={index < activeBar} duration={duration} />
      ))}
    </div>
  )
}

export default CarouselBars

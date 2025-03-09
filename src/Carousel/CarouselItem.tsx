import STYLE from './CarouselItem.module.css'

type CarouselItemProps = {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const CarouselItem = (props: CarouselItemProps) => {
  const { children, className, style } = props

  return (
    <div className={[STYLE['wrapper'], className].join(' ')} style={style}>
      {children}
    </div>
  )
}

export default CarouselItem

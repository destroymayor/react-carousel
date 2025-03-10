import STYLE from './CarouselItem.module.css'

type CarouselItemProps = {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  width?: number
}

const CarouselItem = (props: CarouselItemProps) => {
  const { children, className, style, width = 100 } = props;

  return (
    <div className={[STYLE['wrapper'], className].join(' ')} style={{ flex: `0 0 ${width}%`, ...style }}>
      {children}
    </div>
  )
}

export default CarouselItem

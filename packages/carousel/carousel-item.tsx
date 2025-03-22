import clsx from 'clsx';
import STYLE from './carousel-item.module.css';

type CarouselItemProps = {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    width?: number;
};

const CarouselItem = (props: CarouselItemProps) => {
    const { children, className, style, width = 100 } = props;

    return (
        <div
            className={clsx(STYLE['wrapper'], className)}
            style={{ flex: `0 0 ${width}%`, ...style }}
        >
            {children}
        </div>
    );
};

export default CarouselItem;

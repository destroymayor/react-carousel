import { useCarouselStore } from '../store/Provider';
import clsx from 'clsx';
import STYLE from './carousel-dots.module.css';

type CarouselPaginationProps = {
    className?: string;
    style?: React.CSSProperties;
};

const CarouselPagination = (props: CarouselPaginationProps) => {
    const { className, style } = props;
    const { activeSlide, totalSlides } = useCarouselStore((state) => state);

    return (
        <div className={clsx(STYLE['wrapper'], className)} style={style}>
            {Array.from({ length: totalSlides }).map((_, index) => {
                const isActive = activeSlide - 1 === index;

                return (
                    <div
                        key={index}
                        className={clsx(
                            STYLE['pagination-item'],
                            isActive && STYLE['pagination-item-active'],
                        )}
                    />
                );
            })}
        </div>
    );
};

export default CarouselPagination;

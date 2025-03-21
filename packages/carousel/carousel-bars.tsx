import clsx from 'clsx';

import { useCarouselStore } from '../store/Provider';
import STYLE from './carousel-bars.module.css';

type CarouselBarProps = {
    completed: boolean;
    active: boolean;
    speed: number;
};

const CarouselBar = (props: CarouselBarProps) => {
    const { active, speed, completed } = props;

    return (
        <div className={STYLE['bar-item-wrapper']}>
            <div
                className={clsx(
                    STYLE['bar-item-wrapper-inner'],
                    active && STYLE['bar-progress-animation']
                )}
                style={{
                    animationDuration: `${speed}ms`,
                    width: completed ? '100%' : '0%',
                    transition: active ? 'width 0.3s ease-in-out' : 'none',
                }}
            />
        </div>
    );
};

const CarouselBars = (props: { className?: string }) => {
    const { className } = props;
    const { activeSlide, speed, totalSlides } = useCarouselStore((state) => state);

    const activeBar = activeSlide - 1;

    return (
        <div className={clsx(STYLE['bars-wrapper'], className)}>
            {Array.from({ length: totalSlides }).map((_, index) => (
                <CarouselBar
                    key={index}
                    active={index === activeBar}
                    completed={index < activeBar}
                    speed={speed}
                />
            ))}
        </div>
    );
};

export default CarouselBars;

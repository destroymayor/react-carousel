import { cn } from '@/lib/utils';
import { useCarouselStore } from './Provider';

import styles from './CarouselBars.module.css';

type CarouselBarProps = {
    completed: boolean;
    active: boolean;
    duration: number;
};

const CarouselBar = (props: CarouselBarProps) => {
    const { active, duration, completed } = props;

    return (
        <div className="relative h-[4px] flex-1 overflow-hidden rounded-md bg-zinc-200">
            <div
                className={cn('absolute inset-0 h-full origin-left bg-blue-500', {
                    [styles['progress-animation']]: active,
                    'ease-linear [animation-fill-mode:forwards]': active,
                })}
                style={{
                    animationDuration: `${duration}ms`,
                    transform: completed ? 'translateX(0)' : 'translateX(-100%)',
                    transition: active ? `transform ${duration}ms linear` : 'none',
                }}
            />
        </div>
    );
};

const CarouselBars = (props: { className?: string }) => {
    const { className } = props;
    const { activeSlide, duration, totalSlides } = useCarouselStore((state) => state);

    const activeBar = activeSlide - 1;

    return (
        <div className={cn('flex items-center justify-between gap-2', className)}>
            {Array.from({ length: totalSlides }).map((_, index) => (
                <CarouselBar
                    key={index}
                    active={index === activeBar}
                    completed={index < activeBar}
                    duration={duration}
                />
            ))}
        </div>
    );
};

export default CarouselBars;

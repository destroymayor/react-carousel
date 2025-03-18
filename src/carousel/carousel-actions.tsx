import { useCarouselStore } from '../store/Provider';

import useThrottle from '../hooks/useThrottle';

type CarouselActionProps = {
    children?: React.ReactNode;
};

export const CarouselNext = (props: CarouselActionProps) => {
    const { children } = props;
    const { isTransitioning, scrollNext } = useCarouselStore(
        (state) => state
    );

    const throttleScrollNext = useThrottle(scrollNext, 500);

    const handleClick = () => {
        if (isTransitioning) return;

        throttleScrollNext();
    };

    return <div onClick={handleClick}>{children}</div>;
};

export const CarouselPrevious = (props: CarouselActionProps) => {
    const { children } = props;
    const { isTransitioning, scrollPrev } = useCarouselStore(
        (state) => state
    );

    const throttleScrollPrev = useThrottle(scrollPrev, 500);

    const handleClick = () => {
        if (isTransitioning) return;

        throttleScrollPrev();
    };

    return <div onClick={handleClick}>{children}</div>;
};

export const CarouselToggle = (props: CarouselActionProps) => {
    const { children } = props;
    const { autoPlay, toggleAutoPlay } = useCarouselStore((state) => state);

    return (
        <button onClick={toggleAutoPlay}>
            {autoPlay ? 'Pause' : 'Play'} {children}
        </button>
    );
};

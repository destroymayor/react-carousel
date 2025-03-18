import { useCarouselStore } from '../store/Provider';

type CarouselActionProps = {
    children?: React.ReactNode;
};

export const CarouselNext = (props: CarouselActionProps) => {
    const { children } = props;
    const { isTransitioning, scrollNext } = useCarouselStore(
        (state) => state
    );

    const handleClick = () => {
        if (isTransitioning) return;

        scrollNext();
    };

    return <div onClick={handleClick}>{children}</div>;
};

export const CarouselPrevious = (props: CarouselActionProps) => {
    const { children } = props;
    const { isTransitioning, scrollPrev } = useCarouselStore(
        (state) => state
    );

    const handleClick = () => {
        if (isTransitioning) return;

        scrollPrev();
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

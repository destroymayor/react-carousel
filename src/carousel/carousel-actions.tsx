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
    const { isPlaying, togglePlay } = useCarouselStore((state) => state);

    return (
        <button onClick={togglePlay}>
            {isPlaying ? 'Pause' : 'Play'} {children}
        </button>
    );
};

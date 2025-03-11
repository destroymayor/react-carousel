import { useCarouselStore } from './Provider';

type CarouselActionProps = {
    children: React.ReactNode;
};

export const CarouselNext = (props: CarouselActionProps) => {
    const { children } = props;
    const { isTransitioning, scrollNext, pauseSlide } = useCarouselStore(
        (state) => state
    );

    const handleClick = () => {
        if (isTransitioning) return;

        pauseSlide();
        scrollNext();
    };

    return <div onClick={handleClick}>{children}</div>;
};

export const CarouselPrevious = (props: CarouselActionProps) => {
    const { children } = props;
    const { isTransitioning, scrollPrev, pauseSlide } = useCarouselStore(
        (state) => state
    );

    const handleClick = () => {
        if (isTransitioning) return;

        pauseSlide();
        scrollPrev();
    };

    return <div onClick={handleClick}>{children}</div>;
};

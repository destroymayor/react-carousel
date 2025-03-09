import { cn } from '@/lib/utils';
import { useCarouselStore } from './Provider';

const CarouselPagination = (props: { className?: string }) => {
    const { className } = props;
    const { activeSlide, totalSlides } = useCarouselStore((state) => state);

    return (
        <div
            className={cn(
                'flex items-center justify-center gap-2 rounded-full',
                className
            )}
        >
            {Array.from({ length: totalSlides }).map((_, index) => {
                const isActive = activeSlide - 1 === index;

                return (
                    <div
                        key={index}
                        className={cn(
                            'inline-block h-2 w-2 scale-[0.5] cursor-pointer rounded-full border-none bg-zinc-600 transition-colors duration-300 ease-in-out',
                            {
                                'scale-[1]': isActive,
                                'bg-zinc-200': isActive,
                            }
                        )}
                    />
                );
            })}
        </div>
    );
};

export default CarouselPagination;

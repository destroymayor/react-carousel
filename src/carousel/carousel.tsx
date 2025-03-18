import CarouselProvider from '../store/Provider';
import { CarouselState } from '../store/store';
import CarouselContent from './carousel-content';
import CarouselItem from './carousel-item';
import CarouselDots from './carousel-dots';
import CarouselBars from './carousel-bars';
import { CarouselNext, CarouselPrevious, CarouselToggle } from './carousel-actions';

type CarouselStoreProviderProps = {
    children: React.ReactNode;
    className?: string;
    orientation?: CarouselState['orientation'];
    swipeable?: CarouselState['swipeable'];
    autoPlay?: CarouselState['autoPlay'];
    speed?: CarouselState['speed'];
};

const CarouselStoreProvider = (props: CarouselStoreProviderProps) => {
    const { children, className } = props;

    return (
        <CarouselProvider initialState={{ ...props }}>
            <div className={className}>{children}</div>
        </CarouselProvider>
    );
};

CarouselStoreProvider.Content = CarouselContent;
CarouselStoreProvider.Item = CarouselItem;
CarouselStoreProvider.Dots = CarouselDots;
CarouselStoreProvider.Bars = CarouselBars;
CarouselStoreProvider.Next = CarouselNext;
CarouselStoreProvider.Previous = CarouselPrevious;
CarouselStoreProvider.Toggle = CarouselToggle;

export default CarouselStoreProvider;

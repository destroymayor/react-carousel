import CarouselProvider from '../store/Provider';
import { CarouselState } from '../store/store';
import CarouselContent from './CarouselContent';
import CarouselItem from './CarouselItem';
import CarouselPagination from './CarouselPagination';
import CarouselBars from './CarouselBars';
import { CarouselNext, CarouselPrevious, CarouselToggle } from './CarouselActions';

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
CarouselStoreProvider.Pagination = CarouselPagination;
CarouselStoreProvider.Bars = CarouselBars;
CarouselStoreProvider.Next = CarouselNext;
CarouselStoreProvider.Previous = CarouselPrevious;
CarouselStoreProvider.Toggle = CarouselToggle;
export default CarouselStoreProvider;

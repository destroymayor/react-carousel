import CarouselProvider from './Provider';
import { CarouselState } from './store';
import CarouselContent from './CarouselContent';
import CarouselItem from './CarouselItem';
import CarouselPagination from './CarouselPagination';
import CarouselBars from './CarouselBars';
import { CarouselNext, CarouselPrevious } from './CarouselActions';

type CarouselStoreProviderProps = {
    children: React.ReactNode;
    className?: string;
    orientation?: CarouselState['orientation'];
    swipeable?: CarouselState['swipeable'];
    options?: CarouselState['options'];
};

const CarouselStoreProvider = (props: CarouselStoreProviderProps) => {
    const { children, className } = props

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

export default CarouselStoreProvider;

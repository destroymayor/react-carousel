import React, { createContext, useState, useContext } from 'react';
import { useStore, StoreApi } from 'zustand';

import createCarouselStore, { type CarouselState } from './store';

const CarouselContext = createContext<StoreApi<CarouselState> | undefined>(undefined);

const CarouselProvider = (props: {
    initialState?: Partial<CarouselState>;
    children: React.ReactNode;
}) => {
    const { initialState, children } = props;

    const [store] = useState(() => createCarouselStore(initialState));

    return <CarouselContext.Provider value={store}>{children}</CarouselContext.Provider>;
};

export function useCarouselStore<T>(selector: (state: CarouselState) => T) {
    const context = useContext(CarouselContext);

    if (!context) {
        throw new Error('useCarouselStore must be used within a Provider');
    }

    return useStore(context, selector);
}

export default CarouselProvider;

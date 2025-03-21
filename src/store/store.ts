import { createStore } from 'zustand';

export type CarouselState = {
    isSettled: boolean;
    isPlaying: boolean;
    isActing: boolean;
    isDragging: boolean;
    isTransitioning: boolean;
    speed: number;
    swipeable: boolean;
    totalSlides: number;
    activeSlide: number;
    transitionDuration: number;
    orientation: 'vertical' | 'horizontal';
    setSettled: (isSettled: boolean) => void;
    setActiveSlide: (activeSlide: number) => void;
    setTotalSlides: (totalSlides: number) => void;
    setDragging: (isDragging: boolean) => void;
    setActing: (isActing: boolean) => void;
    setTransitioning: (isTransitioning: boolean) => void;
    togglePlay: () => void;
    scrollNext: () => void;
    scrollPrev: () => void;
    playSlide: () => void;
    pauseSlide: () => void;
};

const createCarouselStore = (initialState?: Partial<CarouselState>) =>
    createStore<CarouselState>((set, get) => ({
        // state
        isSettled: false,
        isPlaying: true,
        isActing: false,
        isDragging: false,
        isTransitioning: false,
        swipeable: true,
        speed: 3000,
        totalSlides: 0,
        activeSlide: 1,
        transitionDuration: 300,
        orientation: 'horizontal',
        ...initialState,

        // mutations
        setSettled: (isSettled) => set({ isSettled }),
        setActiveSlide: (activeSlide) => set({ activeSlide }),
        setTotalSlides: (totalSlides) => set({ totalSlides }),
        setDragging: (isDragging) => set({ isDragging }),
        setActing: (isActing) => set({ isActing }),
        setTransitioning: (isTransitioning) => set({ isTransitioning }),
        scrollNext: () => {
            const { isTransitioning } = get();

            if (isTransitioning) return;

            set((state) => ({
                activeSlide: state.activeSlide + 1,
                isActing: true,
            }));
        },
        scrollPrev: () => {
            const { isTransitioning } = get();

            if (isTransitioning) return;

            set((state) => ({
                activeSlide: state.activeSlide - 1,
                isActing: true,
            }));
        },
        togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
        playSlide: () => set({ isPlaying: true }),
        pauseSlide: () => set({ isPlaying: false }),
    }));

export default createCarouselStore;

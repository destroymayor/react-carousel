import { createStore } from 'zustand';

export type CarouselState = {
    isPlaying: boolean;
    isActing: boolean;
    isDragging: boolean;
    isTransitioning: boolean;
    autoPlay: boolean;
    speed: number;
    swipeable: boolean;
    totalSlides: number;
    activeSlide: number;
    transitionDuration: number;
    orientation: 'vertical' | 'horizontal';
    setActiveSlide: (activeSlide: number) => void;
    setTotalSlides: (totalSlides: number) => void;
    setDragging: (isDragging: boolean) => void;
    setActing: (isActing: boolean) => void;
    setTransitioning: (isTransitioning: boolean) => void;
    setAutoPlay: (autoPlay: boolean) => void;
    toggleAutoPlay: () => void;
    togglePlay: () => void;
    scrollNext: () => void;
    scrollPrev: () => void;
    playSlide: () => void;
    pauseSlide: () => void;
};

const createCarouselStore = (initialState?: Partial<CarouselState>) =>
    createStore<CarouselState>((set, get) => ({
        // state
        isPlaying: true,
        isActing: false,
        isDragging: false,
        isTransitioning: false,
        swipeable: true,
        speed: 1000,
        autoPlay: true,
        totalSlides: 0,
        activeSlide: 1,
        transitionDuration: 300,
        orientation: 'horizontal',
        ...initialState,

        // mutations
        setActiveSlide: (activeSlide) => set({ activeSlide }),
        setTotalSlides: (totalSlides) => set({ totalSlides }),
        setDragging: (isDragging) => set({ isDragging }),
        setActing: (isActing) => set({ isActing }),
        setTransitioning: (isTransitioning) => set({ isTransitioning }),
        setAutoPlay: (autoPlay) => set({ autoPlay }),
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
        toggleAutoPlay: () => set((state) => ({ autoPlay: !state.autoPlay })),
        playSlide: () => set({ isPlaying: true }),
        pauseSlide: () => set({ isPlaying: false }),
    }));

export default createCarouselStore;

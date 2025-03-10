import { createStore } from 'zustand';

export type CarouselState = {
    isPlaying: boolean;
    isDragging: boolean;
    isTransitioning: boolean;
    swipeable: boolean;
    totalSlides: number;
    activeSlide: number;
    transitionDuration: number;
    orientation: 'vertical' | 'horizontal';
    options: {
        autoPlay: boolean;
        loop: boolean;
        speed: number;
    },
    setActiveSlide: (activeSlide: number) => void;
    setTotalSlides: (totalSlides: number) => void;
    setDragging: (isDragging: boolean) => void;
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
    isPlaying: true,
    isDragging: false,
    isTransitioning: false,
    swipeable: true,
    totalSlides: 0,
    activeSlide: 1,
    transitionDuration: 300,
    orientation: 'horizontal',
    options: {
      autoPlay: true,
      loop: true,
      speed: 2000,
    },
    ...initialState,

    // mutations
    setActiveSlide: (activeSlide) => set({ activeSlide }),
    setTotalSlides: (totalSlides) => set({ totalSlides }),
    setDragging: (isDragging) => set({ isDragging }),
    setTransitioning: (isTransitioning) => set({ isTransitioning }),
    scrollNext: () => {
      const { isTransitioning } = get()

      if (isTransitioning) return

      set((state) => ({ activeSlide: state.activeSlide + 1 }))
    },
    scrollPrev: () => {
      const { isTransitioning } = get()

      if (isTransitioning) return

      set((state) => ({ activeSlide: state.activeSlide - 1 }))
    },
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
    playSlide: () => set({ isPlaying: true }),
    pauseSlide: () => set({ isPlaying: false }),
  }))

export default createCarouselStore;

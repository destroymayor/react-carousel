import { useState, useRef } from 'react';

type UseSwipeProps = {
    orientation: 'horizontal' | 'vertical';
    enabled: boolean;
    isDragging: boolean;
    setDragging: (dragging: boolean) => void;
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
};

type SwipeMouseEvent = MouseEvent | React.MouseEvent;
type SwipeTouchEvent = TouchEvent | React.TouchEvent;

const useSwipe = (props: UseSwipeProps) => {
    const { enabled, orientation, isDragging, setDragging, onSwipeLeft, onSwipeRight } =
        props;
    const ref = useRef<HTMLDivElement>(null);
    const [swipeingTranslate, setSwipeingTranslate] = useState(0);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right' | null>(null);

    const handleTouchStart = (e: SwipeTouchEvent | SwipeMouseEvent) => {
        if (!enabled) {
            return;
        }
        e.preventDefault();

        const touch = 'touches' in e ? e.touches[0] : e;

        setStartX(touch.clientX);
        setStartY(touch.clientY);
        setDragging(true);
    };

    const handleTouchMove = (e: SwipeTouchEvent | SwipeMouseEvent) => {
        if (!enabled || !isDragging) {
            return;
        }

        const touch = 'touches' in e ? e.touches[0] : e;
        const offsetX = touch.clientX - startX;
        const offsetY = touch.clientY - startY;

        if (Math.abs(offsetX) > Math.abs(offsetY)) {
            setDirection(offsetX > 0 ? 'right' : 'left');
        }

        if (orientation === 'horizontal') {
            setSwipeingTranslate(offsetX);
        } else {
            setSwipeingTranslate(offsetY);
        }
    };

    const handleTouchEnd = () => {
        if (!enabled) {
            return;
        }

        setDragging(false);

        if (orientation === 'horizontal') {
            if (swipeingTranslate > 100) {
                onSwipeLeft();
            } else if (swipeingTranslate < -100) {
                onSwipeRight();
            }
        } else {
            if (swipeingTranslate > 100) {
                onSwipeLeft();
            } else if (swipeingTranslate < -100) {
                onSwipeRight();
            }
        }

        setSwipeingTranslate(0);
    };

    return {
        ref,
        swipeingTranslate,
        direction,
        handlers: {
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
            onMouseDown: handleTouchStart,
            onMouseMove: handleTouchMove,
            onMouseUp: handleTouchEnd,
            onMouseLeave: handleTouchEnd,
        },
    };
};

export default useSwipe;

import { useState } from 'react';

type UseSwipeProps = {
    direction: 'horizontal' | 'vertical';
    enabled: boolean;
    isDragging: boolean;
    setDragging: (dragging: boolean) => void;
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
};

type SwipeMouseEvent = MouseEvent | React.MouseEvent;
type SwipeTouchEvent = TouchEvent | React.TouchEvent;

const useSwipe = (props: UseSwipeProps) => {
    const { enabled, direction, isDragging, setDragging, onSwipeLeft, onSwipeRight } =
        props;
    const [swipeingTranslate, setSwipeingTranslate] = useState(0);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

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

        if (direction === 'horizontal') {
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

        if (direction === 'horizontal') {
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

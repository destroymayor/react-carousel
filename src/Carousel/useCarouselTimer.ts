import { useEffect, useRef } from 'react';

type CarouselTimerProps = {
  callback: () => void
  speed: number
}

const useCarouselTimer = ({ callback, speed }: CarouselTimerProps) => {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const startTimer = () => {
    clearTimer()

    timerRef.current = setInterval(() => {
      callbackRef.current()
    }, speed)
  }

  const resetTimer = () => {
    clearTimer()
    startTimer()
  }

  return { clearTimer, startTimer, resetTimer }
}

export default useCarouselTimer;

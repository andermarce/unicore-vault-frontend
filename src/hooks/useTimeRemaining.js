import { useEffect, useState } from 'react';

export const useTimeRemaining = (endTime) => {
  const [timeRemaining, setTimeRemaining] = useState("00:00:00")

  const calculateTimeRemaining = () => {
    const now = Date.now()
    const difference = endTime - now
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60))),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    return timeLeft
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return `${timeRemaining.hours || "00"}:${timeRemaining.minutes || "00"}:${timeRemaining.seconds || "00"}`
    
}

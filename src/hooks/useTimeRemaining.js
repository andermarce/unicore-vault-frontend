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

  const padTime = (time) => {
    if (!time) {
      return "00"
    } else if (time < 10) {
      return "0" + time
    } else {
      return time
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return `${padTime(timeRemaining.hours)}:${padTime(timeRemaining.minutes)}:${padTime(timeRemaining.seconds)}`
    
}

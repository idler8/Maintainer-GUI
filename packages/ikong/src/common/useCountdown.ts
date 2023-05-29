import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

export default function useCountdown(): [
  number,
  Dispatch<SetStateAction<number>>
] {
  const [countdown, setCountdown] = useState(0);
  useEffect(() => {
    const time = setInterval(() => {
      setCountdown((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(time);
  }, []);
  return [countdown, setCountdown];
}

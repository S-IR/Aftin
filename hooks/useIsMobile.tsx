import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";

export function useIsMobile() {
  const [isMobileState, setIsMobileState] = useState(false);

  useEffect(() => {
    setIsMobileState(isMobile);
  }, []);

  return isMobileState;
}

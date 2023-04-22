import React, { useEffect } from "react";
import { PuffLoader } from "react-spinners";

interface props {
  isLoading: boolean;
}
function disableScroll() {
  document.body.style.overflow = "hidden";
}

function enableScroll() {
  document.body.style.overflow = "auto";
}
/**
 * Meant to appear when you would like the whole screen to be covered similarly ot a modal with a a loading screen.
 * @param param0
 * @returns
 */
const LoadingScreen = ({ isLoading }: props) => {
  useEffect(() => {
    if (isLoading) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isLoading]);

  if (!isLoading) return null;
  return (
    <section
      className={`fixed top-0 left-0  z-[100] flex h-screen w-screen items-center justify-center bg-black/40 align-middle`}
    >
      <PuffLoader
        color={`purple`}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </section>
  );
};

export default LoadingScreen;

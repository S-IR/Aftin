import React from "react";
import { PuffLoader } from "react-spinners";

const Loading = () => {
  return (
    <section
      className={`z-[100] flex  h-full w-full items-center justify-center`}
    >
      <PuffLoader
        color={`purple`}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </section>
  );
};

export default Loading;

import React from "react";

const BeautySells = () => {
  return (
    <article className="relative z-50 flex h-[75vh] w-full items-center justify-center border-y-2 border-dashed border-orange-400/20 bg-gray-800 align-middle">
      <h2 className="w-1/2 bg-gradient-to-r from-white to-orange-600 bg-clip-text text-center font-Handwriting text-4xl text-transparent  lg:text-8xl">
        Beauty Sells
      </h2>
      <p className="w-1/2 pl-4 text-center font-serif text-2xl">
        Aftin is built on three foundations : <br></br>
        <br></br>
        <span className="font-Handwriting">
          People eat with their eyes first<br></br>
          Restaurants sell atmospheres as much as they sell foods<br></br>
          Uniqueness is paramount <br></br>
        </span>
      </p>
    </article>
  );
};

export default BeautySells;

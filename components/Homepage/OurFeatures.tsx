import Link from "next/link";
import React from "react";
import { homepageFeaturesList } from "../../constants/homepage/homepageFeaturesList";

const OurFeatures = () => {
  return (
    <div className="flex h-auto min-h-[75vh] w-screen flex-col items-center bg-white/10">
      <h2 className="mt-20 bg-gradient-to-br from-red-300 to-white bg-clip-text font-Handwriting text-8xl  text-transparent text-white">
        We are at your disposal
      </h2>
      <h3 className="text-serif text-lg">
        We are here to achieve your desired aesthetic and attract the most
        amount of customers{" "}
      </h3>
      <div className=" m-4 grid grid-cols-2 ">
        {homepageFeaturesList.map((feature) => {
          return (
            <Link
              href={feature.href}
              key={feature.href}
              className={
                "flex h-[15vh] w-full items-center justify-center bg-black/10 align-middle transition-all duration-300 hover:bg-black/30"
              }
            >
              <a>
                <div
                  className={
                    "group flex h-[35vh] w-full items-center justify-center bg-black/10 align-middle transition-all duration-300 hover:bg-black/30"
                  }
                >
                  <div className="flex flex-col items-center justify-center align-middle">
                    <p className="bg-gradient-to-br from-red-300 to-white bg-clip-text font-serif text-2xl  text-yellow-300 text-transparent transition-all duration-300 group-hover:-translate-y-6">
                      {feature.title}
                    </p>
                    <p className="text-center opacity-0  transition-all duration-300 group-hover:-translate-y-6 group-hover:opacity-100">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default OurFeatures;

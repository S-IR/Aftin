import Image from "next/image";
import Logo from "../public/aftinLogo.png";
import { useRouter } from "next/router";

export default function Custom404() {
    const router = useRouter()
    console.log('router pathname', router.pathname)
  return (
    <section className="flex h-[90vh] w-full flex-col items-center justify-center   overflow-clip">
      <Image
        src={"/aftinLogo.png"}
        width={256}
        height={256}
        quality={100}
        alt={"Aftin Logo"}
        className="rounded-full"
      />
      <h1 className="mt-10 text-center font-Handwriting text-6xl text-orange-300 lg:text-8xl">
        Page not found <br></br> Error - 404
      </h1>
    </section>
  );
}

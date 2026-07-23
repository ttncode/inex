import Image from "next/image";

export default function Introduce({ image, page }: { image: string; page: string }) {
  return (
    <section className="grid lg:grid-cols-5 sms:grid-cols-1 lg:h-115 sms:h-136 w-full">
      <div className="flexCenter lg:col-span-2 h-full bg-primary">
        <div className="lg:w-[64%] lg:h-[41%] sms:w-[80%] h-[70%] border-white border-3">
          <div className="flexCenter w-full h-full">
            <h1 className="font-condensed text-white lg:text-introduce sms:text-[3rem] font-bold">
              {page.toUpperCase()}
            </h1>
          </div>
        </div>
      </div>
      <div className="lg:col-span-3 h-full w-full lg:order-none sms:order-first">
        <Image
          src={image}
          blurDataURL={image}
          className="object-cover object-center h-full w-full"
          alt="background-image"
          width={911.53}
          height={460}
          loading="lazy"
        />
      </div>
    </section>
  );
}

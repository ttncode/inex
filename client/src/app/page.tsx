/* eslint-disable react/no-unescaped-entities */
"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import ProductList from "components/ProductList";
import ArrowIcon from "public/icons/ArrowIcon";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "context/AuthContext";
import { loginSuccess } from "context/AuthAction";

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { dispatch } = useAuth();

  useEffect(() => {
    const loginWithAccessToken = async () => {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken && user) return;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT!}/api/auth/login/sso`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status !== 200) return;
      dispatch(loginSuccess(res.data.user));
    };
    loginWithAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.main
      className="xl:mt-header-xl lg:mt-header-lg sm:mt-header-sm"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-line bg-center w-full h-full">
        <div className="grid lg:grid-cols-3 sms:grid-cols-1 w-full">
          <div className="col-span-2 w-full h-197 bg-[url('/images/background-home-1.webp')] lg:bg-cover sms:bg-center text-white">
            <motion.div
              className="lg:mt-68 lg:ml-40 sms:mt-95 sms:ml-20"
              variants={{
                hidden: { opacity: 0, y: 250 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <h1 className="font-condensed text-title font-bebas font-medium tracking-title1">IT'S TIME</h1>
              <h1 className="font-condensed text-title font-bebas font-medium tracking-title2">TO STEP UP</h1>
              <h1 className="font-condensed mb-6 text-title font-bebas font-medium tracking-title3">YOUR GAME</h1>
              <div className="ml-24 px-2 w-fit">
                <Link
                  href="/shop"
                  className="py-2 w-full h-full lg:font-light lg:text-sm sms:font-normal sms:text-lg cursor-pointer border-b-2 border-white"
                >
                  <span className="hover:opacity-80">SHOP NOW</span>
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="col-span-1 lg:h-197 sms:h-[100vh] bg-[url('/images/background-home-3.webp')] bg-cover">
            <div className="flexCenter h-full w-full bg-transparent bg-no-repeat">
              <motion.div
                className="w-[64%] lg:h-[53.2%] md:h-[70%] sms:h-[62%] bg-[url('/images/background-home-2.webp')] lg:bg-cover sms:bg-right bg-no-repeat"
                variants={{
                  hidden: { opacity: 0, x: 250 },
                  visible: { opacity: 1, x: 0 },
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.25 }}
              ></motion.div>
            </div>
          </div>
        </div>

        <div className="lg:relative grid lg:grid-cols-3 sms:grid-cols-1 lg:grid-rows-4 w-full lg:h-282 sms:h-fit bg-primary lg:pt-20 lg:px-20 sms:pt-10 sms:px-6 lg:pb-75">
          <div className="relative lg:col-span-1 w-full lg:h-172 sms:h-[100vh]">
            <Image
              src="/images/background-home-4.webp"
              blurDataURL="/images/background-home-4.webp"
              className="object-cover object-center w-full h-full"
              alt="background-image"
              loading="lazy"
              width={455}
              height={688}
            />

            <div className="absolute bottom-12 left-0 right-0 flex flex-col justify-center pl-6 h-38 sms:mx-auto lg:w-full sms:w-[90%] bg-nav text-primary">
              <div className="relative font-condensed text-4xl font-medium tracking-tight leading-12">
                <h1>SHOP NEW</h1>
                <h1>ARRIVALS</h1>
                <div className="flex flex-col justify-end items-center cursor-pointer absolute lg:right-8 sms:right-4 bottom-2 h-44 w-17 border-primary border-3">
                  <ArrowIcon
                    width={24}
                    height={24}
                    fill="var(--paragraph-color)"
                    style={{ rotate: "180deg", marginBottom: "20px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-1 w-full lg:h-172 sms:h-[100vh]">
            <Image
              src="/images/background-home-5.webp"
              blurDataURL="/images/background-home-5.webp"
              className="object-cover object-center w-full h-full"
              alt="background-image"
              loading="lazy"
              width={455}
              height={688}
            />

            <div className="absolute bottom-12 left-0 right-0 flex flex-col justify-center pl-6 h-38 sms:mx-auto lg:w-full sms:w-[90%] bg-primary text-white">
              <div className="relative font-condensed text-4xl font-medium tracking-tight leading-12">
                <h1>SHOP NEW</h1>
                <h1>BESTSELLER</h1>
                <div
                  onClick={() => router.push("/shop")}
                  className="flex flex-col justify-end items-center cursor-pointer absolute lg:right-8 sms:right-4 bottom-2 h-44 w-17 border-white border-3"
                >
                  <ArrowIcon width={24} height={24} fill="white" style={{ rotate: "180deg", marginBottom: "20px" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-1 w-full lg:h-172 sms:h-[100vh]">
            <Image
              src="/images/background-home-6.webp"
              blurDataURL="/images/background-home-6.webp"
              className="object-cover object-center w-full h-full"
              alt="background-image"
              loading="lazy"
              width={455}
              height={688}
            />

            <div className="absolute bottom-12 left-0 right-0 flex flex-col justify-center pl-6 h-38 sms:mx-auto lg:w-full sms:w-[90%] bg-nav text-primary">
              <div className="relative font-condensed text-4xl font-medium tracking-tight leading-12">
                <h1>SHOP NEW</h1>
                <h1>COMMUNITY</h1>
                <div
                  onClick={() => router.push("/forum")}
                  className="flex flex-col justify-end items-center cursor-pointer absolute lg:right-8 sms:right-4 bottom-2 h-44 w-17 border-primary border-3"
                >
                  <ArrowIcon
                    width={24}
                    height={24}
                    fill="var(--paragraph-color)"
                    style={{ rotate: "180deg", marginBottom: "20px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:absolute grid lg:grid-cols-2 sms:grid-cols-1 lg:gap-40 sms:gap-0 lg:px-68 lg:top-216 lg:left-0 sms:py-16 sms:px-10">
            <div className="flex flex-col items-center lg:gap-4 sms:gap2 lg:pt-17 sms:pt-10 lg:order-first sms:order-last">
              <h1 className="font-condensed leading-titleLarge tracking-wider lg:text-titleLarge sms:text-[4rem] text-white">
                WORKOUT
              </h1>
              <h1 className="font-condensed leading-titleLarge tracking-wider lg:text-titleLarge sms:text-[4rem] text-white">
                ANYTIME,
              </h1>
              <h1 className="font-condensed leading-titleLarge tracking-wider lg:text-titleLarge sms:text-[4rem] lg:text-primary sms:text-white">
                ANYWHERE
              </h1>
              <p className="lg:min-w-[380px] sms:w-full text-center text-base text-paragraph font-base mt-8">
                I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click “Edit Text” or
                double click me to add your own content and make changes to the font.
              </p>
              <div className="mt-10">
                <Link href={"/about"}>
                  <button className="h-10 w-35 lg:bg-primary border-2 lg:text-white sms:border-paragraph lg:border-primary sms:bg-paragraph sms:text-white text-base lg:hover:text-primary lg:hover:bg-paragraph lg:hover:border-primary sms:hover:opacity-75 lg:hover:opacity-100 lg:transition lg:duration-300 lg:ease-linear">
                    Read More
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative p-6 bg-nav sms:overflow-hidden">
              <Image
                src="/images/background-home-7.webp"
                blurDataURL="/images/background-home-7.webp"
                className="object-cover object-center w-full h-full"
                alt="background-image"
                loading="lazy"
                width={340}
                height={594}
              />
              <div className="absolute w-95 h-136 border-primary border-3 top-12 left-12"></div>
            </div>
          </div>
        </div>

        <div className="bg-transparent w-full lg:h-152 sms:h-20"></div>
        <h1 className="font-condensed text-5xl font-medium text-center tracking-tight leading-12 text-text">
          NEW ARRIVALS
        </h1>

        <div className="mt-20 lg:px-20 sms:px-10">
          <ProductList newArrival={true} />
        </div>

        <div className="w-full text-center lg:pt-20 sms:pt-10 pb-16">
          <button className="h-11 w-65 border-primary border-2 text-primary lg:text-base sms:text-xl hover:text-white hover:bg-primary transition duration-300 ease-linear">
            <Link href="/shop" className="flexCenter w-full h-full">
              Shop All
            </Link>
          </button>
        </div>
      </div>
    </motion.main>
  );
}

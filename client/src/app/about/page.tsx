/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import Introduce from "components/Introduce";
import ArrowIcon from "public/icons/ArrowIcon";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <motion.section
      className="xl:mt-header-xl lg:mt-header-lg sms:mt-header-sm"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Introduce image="/images/background-about.webp" page="About" />
      <main className="flexCenter w-full h-fit lg:px-0 sms:px-10 bg-line bg-cover">
        <div className="lg:w-8/12 sms:w-full my-28">
          <div className="flex flex-col lg:w-[40.25rem] sms:w-full h-fit">
            <div className="relative flexBetween lg:flex-row sms:flex-col w-full lg:h-[12.25rem] sms:h-[80vh] text-2xl font-bold text-primary border-3 border-primary border-solid">
              <div className="p-10 flex gap-10">
                <ArrowIcon width={28} height={28} fill="var(--primary-color)" style={{ transform: "rotate(180deg)" }} />
                <div className="flex flex-col text-primary font-medium text-4xl">
                  <span>THE IN.EX</span>
                  <span>STORY</span>
                </div>
              </div>

              <div className="lg:w-fit sms:w-full">
                <div className="lg:w-[12.2rem] sms:w-[20.5625rem] lg:h-[12.2rem] sms:h-[20.5625rem]">
                  <div className="lg:border-[6.125rem] sms:border-[10.28125rem] border-l-primary border-t-primary border-r-transparent border-b-transparent border-solid lg:rotate-0 sms:-rotate-90"></div>
                </div>
              </div>

              <div className="absolute lg:bottom-[-162%] lg:right-[-30%] sms:bottom-5 sms:right-5 lg:w-[348px] lg:h-[467px] sms:w-[88%] sms:h-[64%]">
                <Image
                  src="/images/image1-about.webp"
                  blurDataURL="/images/image1-about.webp"
                  loading="lazy"
                  className="lg:object-cover sms:object-top h-full w-full"
                  alt="backround-sport.png"
                  width={348}
                  height={467}
                />
              </div>
            </div>

            <div className="lg:px-12 lg:pt-12 lg:pb-12 sms:px-0 sms:pb-0 sms:pt-20 text-paragraph lg:text-base sms:text-xl lg:font-light sms:font-normal">
              <div className="flex flex-col gap-6 max-w-[22.5rem]">
                <p>
                  I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click “Edit Text” or
                  double click me to add your own content and make changes to the font. Feel free to drag and drop me
                  anywhere you like on your page. I'm a great place for you to tell a story and let your users know a
                  little more about you.
                </p>
                <p>
                  This is a great space to write long text about your company and your services. You can use this space
                  to go into a little more detail about your company. Talk about your team and what services you
                  provide. Tell your visitors the story of how you came up with the idea for your business and what
                  makes you different from your competitors. Make your company stand out and show your visitors who you
                  are.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </motion.section>
  );
}

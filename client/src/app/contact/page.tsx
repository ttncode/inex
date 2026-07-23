"use client";

import Image from "next/image";
import Introduce from "components/Introduce";
import ArrowIcon from "public/icons/ArrowIcon";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = () => {
    setFormValue({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };
  console.log(formValue);

  return (
    <motion.section
      className="xl:mt-header-xl lg:mt-header-lg sms:mt-header-sm"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Introduce image="/images/background-contact.webp" page="contact" />

      <main className="flexCenter w-full h-fit lg:py-24 sms:py-10">
        <div className="flex flex-col lg:w-8/12 sms:w-full gap-16 lg:px-0 sms:px-10">
          <div className="flex lg:flex-row sms:flex-col lg:gap-24 sms:gap-0 w-full">
            <div className="lg:w-1/2 w-full">
              <div className="flexBetween flex-col">
                <div className="relative flexBetween flex-col lg:w-[24.5rem] lg:h-[44.3125rem] sms:h-[70vh] sms:w-[88vw] border-3 border-primary border-solid text-primary text-xl">
                  <div className="flex lg:justify-start sms:justify-center gap-8 w-full lg:py-14 sms:py-8 px-12">
                    <div className="w-fit h-fit lg:block sms:hidden">
                      <ArrowIcon
                        width={28}
                        height={28}
                        fill="var(--primary-color)"
                        style={{ transform: "rotate(180deg)", marginTop: "4px" }}
                      />
                    </div>

                    <div className="font-condensed text-primary text-4xl font-semibold">
                      <h1>EXHALE</h1>
                      <h1>WITH US</h1>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 height-[12.25rem] w-[12.25rem] border-l-primary border-l-[6.125rem] border-t-transparent border-t-[6.125rem] border-r-transparent border-r-[6.125rem] border-solid border-b-[6.125rem] border-b-primary"></div>

                  <div className="absolute sms:bottom-6 sms:left-6 lg:bottom-12 lg:left-12 sms:h-[70%] sms:w-[87%] lg:h-[467px] lg:w-[396px] z-10">
                    <Image
                      src="/images/image1-contact.webp"
                      blurDataURL="/images/image1-contact.webp"
                      loading="lazy"
                      className="object-cover w-full h-full"
                      alt="backround-sport.png"
                      width={396}
                      height={467}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-20 lg:w-1/2 sms:w-full">
              <div className="flex flex-col lg:gap-20 sms:gap-10 lg:mt-40 sms:mt-14 w-full lg:text-sm sms:text-lg lg:leading-6 sms:leading-9 font-normal">
                <div className="flex flex-col text-primary">
                  <h1 className="lg:text-2xl sms:text-4xl font-medium mb-6">VISIT OUR STORE</h1>
                  <span>Address: 500 Terry Francine Street</span>
                  <span>San Francisco, CA 94158</span>
                  <span>Phone: 123-456-7890</span>
                  <span>Email: info@my-domain.com</span>
                </div>

                <div className="flex flex-col text-text">
                  <h1 className="lg:text-2xl sms:text-4xl font-medium mb-6 text-text">STOCKISTS</h1>

                  <div className="flex lg:flex-row sms:flex-col gap-10">
                    <div className="flex flex-col gap-10">
                      <div className="flex flex-col">
                        <span>Store 1</span>
                        <span>500 Terry Francine Street</span>
                        <span>San Francisco, CA 94158</span>
                        <span>​Tel: 123-456-7890</span>
                      </div>

                      <div className="flex flex-col">
                        <span>Store 2</span>
                        <span>500 Terry Francine Street</span>
                        <span>San Francisco, CA 94158</span>
                        <span>​Tel: 123-456-7890</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-10">
                      <div className="flex flex-col">
                        <span>Store 3</span>
                        <span>500 Terry Francine Street</span>
                        <span>San Francisco, CA 94158</span>
                        <span>​Tel: 123-456-7890</span>
                      </div>

                      <div className="flex flex-col">
                        <span>Store 4</span>
                        <span>500 Terry Francine Street</span>
                        <span>San Francisco, CA 94158</span>
                        <span>​Tel: 123-456-7890</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form className="flex flex-col py-10 lg:px-10 sms:px-0 text-sm text-paragraph gap-4">
            <div className="flex lg:flex-row lg:justify-between lg:items-center sms:flex-col gap-2">
              <input
                value={formValue.name}
                type="text"
                className="lg:w-1/2 sms:w-full lg:py-2 sms:py-4 px-3 border-b-[1px] focus:border-b-3 outline-none bg-transparent border-paragraph border-solid text-base text-paragraph"
                placeholder="Name"
                onChange={(e) => setFormValue((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
              <input
                value={formValue.email}
                type="text"
                className="lg:w-1/2 sms:w-full lg:py-2 sms:py-4 px-3 border-b-[1px] focus:border-b-3 outline-none bg-transparent border-paragraph border-solid text-base text-paragraph"
                placeholder="Email"
                onChange={(e) => setFormValue((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <input
              value={formValue.subject}
              type="text"
              className="w-full lg:py-2 sms:py-4 px-3 border-b-[1px] focus:border-b-3 outline-none bg-transparent border-paragraph border-solid text-base text-paragraph"
              placeholder="Subject"
              onChange={(e) => setFormValue((prev) => ({ ...prev, subject: e.target.value }))}
              required
            />
            <textarea
              value={formValue.message}
              className="w-full h-[126px] pt-2 px-3 pb-4 border-b-[1px] focus:border-b-3 outline-none bg-transparent border-paragraph border-solid text-base text-paragraph placeholder:text-left"
              placeholder="Message"
              onChange={(e) => setFormValue((prev) => ({ ...prev, message: e.target.value }))}
              required
              rows={4}
            />
            <div className="flexCenter">
              <button
                className="mt-8 py-[8px] px-24 border-primary border-2 text-white lg:text-sm sms:text-xl bg-primary hover:text-primary hover:bg-paragraph hover:border-primary hover:border-2 transition duration-300 ease-linear"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </motion.section>
  );
}

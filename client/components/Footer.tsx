"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  useEffect(() => {
    const checkEmailValid = (email: string) => {
      if (email !== "") {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const checkValid = regex.test(email.toLowerCase());
        if (checkValid) {
          setIsEmailValid(true);
        } else {
          setIsEmailValid(false);
        }
      }
    };
    checkEmailValid(email);
  }, [email]);

  return pathname !== "/payment/success" ? (
    <footer className="w-full">
      <div className="flexCenter w-full pb-20 bg-paragraph">
        <div className="flex justify-center xl:w-4/6 sms:w-[70%] h-auto">
          <section className="grid sms:grid-cols-1 xl:grid-cols-10 w-full xl:gap-y-0 sms:gap-y-14 pt-4 md:pt-8 lg:pt-12 xl:pt-25 sms:pt-14">
            <div className="xl:col-span-2 flex flex-col xl:gap-12 sms:gap-4 text-center md:text-left">
              <h1 className="xl:text-2xl sms:text-3xl text-primary font-condensed">IN.EX</h1>
              <div className="flex flex-col gap-2 xl:text-sm">
                <Link href="/home">Home</Link>
                <Link href="/shop">Shop</Link>
                <Link href="/about">About</Link>
                <Link href="/forum">Forum</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>

            <div className="xl:col-span-3 flex flex-col xl:gap-12 sms:gap-4 text-center md:text-left">
              <h1 className="xl:text-2xl sms:text-3xl text-primary font-condensed">EXPERIENCE</h1>
              <div className="flex flex-col gap-2">
                <Link href="/home">FQA</Link>
                <Link href="/shop">Shipping & Returns</Link>
                <Link href="/about">Store Policy</Link>
                <Link href="/forum">Payment Methods</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>

            <div className="xl:col-span-2 flex flex-col xl:gap-12 sms:gap-4 text-center md:text-left">
              <h1 className="xl:text-2xl sms:text-3xl text-primary font-condensed">FOLLOW US</h1>
              <div className="flex flex-col gap-2">
                <Link href="/home">Facebook</Link>
                <Link href="/shop">Twitter</Link>
                <Link href="/about">Instagram</Link>
                <Link href="/forum">Forum</Link>
                <Link href="/contact">Pinterest</Link>
              </div>
            </div>

            <div className="xl:col-span-3 flex flex-col gap-10 text-center md:text-left">
              <h1 className="xl:text-2xl sms:text-3xl text-primary font-condensed">JOIN OUR NEWSLETTER</h1>
              <div className="flex flex-col gap-2 mt-2">
                <div
                  className={`w-full h-12 border-b-3 border-solid ${isEmailValid ? "border-white" : "border-rose-600"}`}
                >
                  <input
                    type="text"
                    value={email}
                    className="w-full h-full px-4 text-white outline-none bg-transparent lg:text-sm sms:text-xl lg:placeholder:text-sm sms:placeholder:text-lg"
                    placeholder="Enter your email here"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button className="mt-4 lg:h-9 sms:h-11 w-full border-primary border-2 text-white lg:text-sm sms:text-lg bg-primary hover:text-primary hover:bg-paragraph hover:border-primary hover:border-2 transition duration-300 ease-linear">
                  Subscribe Now
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="flexCenter h-20 bg-primary">
        <p className="w-3/5 text-sm text-paragraph">© 2035 by IN.EX. Powered and secured. Welcome with us.</p>
      </div>
    </footer>
  ) : (
    <></>
  );
}

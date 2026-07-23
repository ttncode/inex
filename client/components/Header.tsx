"use client";

import Nav from "./Nav";
import Link from "next/link";
import Cart from "./Cart";
import ProfileIcon from "public/icons/ProfileIcon";
import LogoIcon from "public/icons/LogoIcon";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PiBasketLight } from "react-icons/pi";
import { TfiMenu } from "react-icons/tfi";
import { VscChromeClose } from "react-icons/vsc";
import { useCartState } from "../context/CartStateContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const { showCart, setShowCart, totalQuantities } = useCartState();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return pathname !== "/payment/success" ? (
    <header className="fixed top-0 left-0 z-50 grid grid-cols-12 grid-rows-1 xl:h-header-xl lg:h-header-lg sms:h-header-sm w-screen bg-black">
      {/*-------  LOGO -- -----*/}
      <div
        className="lg:col-span-3 sms:col-span-7 flex items-center h-full sms:w-2/3 xl:w-fit sms:text-3xl xl:text-4xl gap-4 sms:ml-0 sms:pl-6 xl:ml-14 font-bold text-white tracking-widest cursor-pointer z-10"
        onClick={() => router.push("/")}
      >
        <div className="p-2 border-solid border-2 border-white">
          <LogoIcon width={24} height={24} fill="white" />
        </div>
        <h1 className="hover:text-primary transitionText cursor-pointer">IN.EX</h1>
      </div>

      <div className="lg:flex sms:hidden lg:col-span-6 sms:col-auto ml-auto">
        <Nav />
      </div>

      <div className="lg:col-span-3 sms:col-span-5 ml-auto relative flexEnd h-full w-full">
        <Link href={`${user ? "/profile" : "/login"}`}>
          <div className="flexCenter cursor-pointer text-primary font-base hover:text-login lg:flex sms:hidden">
            {user?.avatar ? (
              <Image
                src={user?.avatar}
                blurDataURL={user?.avatar}
                alt="Avatar"
                width={25}
                height={25}
                style={{ borderRadius: "100%", objectFit: "cover" }}
              />
            ) : (
              <ProfileIcon width={25} height={25} fill="var(--primary-color)" />
            )}

            {user?.username ? <span className="px-3">{user?.username}</span> : <span className="px-3">Log In</span>}
          </div>
        </Link>

        <div className="relative flexCenter lg:gap-0 md:gap-4 sms:gap-3 lg:w-24 sms:w-full h-full bg-primary">
          <div className="flexCenter gap-[2px] cursor-pointer xl:p-0 sms:p-4" onClick={() => setShowCart(true)}>
            <PiBasketLight className="w-[32px] h-[32px]" color="#1f1f1f" />
            <span className="pt-[4px] text-lg text-paragraph">{totalQuantities}</span>
          </div>

          {/*-------  MENU  -------*/}
          <div
            onClick={() => setShowMenu(true)}
            className="flexCenter sms:w-60px sms:h-full lg:hidden sms:flex text-paragraph"
          >
            <button className="text-3xl p-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <TfiMenu />
            </button>
          </div>
        </div>

        <Cart />
      </div>

      <motion.section
        className="absolute top-0 left-0 w-screen h-screen flex flex-col gap-10 bg-paragraph z-50"
        variants={{
          hidden: { opacity: 0, x: "100%" },
          show: { opacity: 1, x: "0" },
        }}
        transition={{ duration: 0.85 }}
        initial="hidden"
        animate={showMenu ? "show" : "hidden"}
      >
        <div className="flexEnd w-full pr-6 h-28">
          <div className="w-fit h-fit p-3" onClick={() => setShowMenu(false)}>
            <VscChromeClose className="text-4xl fill-primary" />
          </div>
        </div>
        <div className="flexEnd w-full pr-10">
          <div className="flex flex-col gap-10 w-[60%] menu-animation">
            <div onClick={() => setShowMenu(false)} className="flexCenter w-full shadow-lg">
              <div
                className="flexCenter w-fit h-fit hover:cursor-pointer hover:opacity-90"
                onClick={() => {
                  if (user) router.push("/profile");
                  else router.push("/login");
                }}
              >
                {user?.avatar ? (
                  <Image
                    src={user?.avatar}
                    blurDataURL={user?.avatar}
                    alt="Avatar"
                    width={40}
                    height={40}
                    style={{ borderRadius: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <ProfileIcon width={30} height={30} fill="var(--primary-color)" />
                )}

                {user ? (
                  <span className="lg:text-lg sms:text-2xl text-primary px-3">{user?.username}</span>
                ) : (
                  <span className="lg:text-lg sms:text-2xl text-primary px-3">Log In</span>
                )}
              </div>
            </div>

            <ul className="flex-col mt-1 mr-6 w-full top-header-sm right-0 h-fit bg-paragraph text-2xl transition-all duration-300 shadow-lg">
              <li
                onClick={() => setShowMenu(false)}
                className="flexCenter py-3 border-b-[1px] border-gray-300 border-solid hover:bg-gray-400 hover:text-paragraph cursor-pointer"
              >
                <a className={pathname === "/" ? "text-primary" : "text-white"} href="/">
                  Home
                </a>
              </li>
              <li
                onClick={() => setShowMenu(false)}
                className="flexCenter py-3 border-b-[1px] border-gray-300 border-solid hover:bg-gray-400 hover:text-paragraph cursor-pointer"
              >
                <a className={pathname === "/shop" ? "text-primary" : "text-white"} href="/shop">
                  Shop
                </a>
              </li>
              <li
                onClick={() => setShowMenu(false)}
                className="flexCenter py-3 border-b-[1px] border-gray-300 border-solid hover:bg-gray-400 hover:text-paragraph cursor-pointer"
              >
                <a className={pathname === "/about" ? "text-primary" : "text-white"} href="/about">
                  About
                </a>
              </li>
              <li
                onClick={() => setShowMenu(false)}
                className="flexCenter py-3 border-b-[1px] border-gray-300 border-solid hover:bg-gray-400 hover:text-paragraph cursor-pointer"
              >
                <a className={pathname === "/forum" ? "text-primary" : "text-white"} href="/forum">
                  Forum
                </a>
              </li>
              <li
                onClick={() => setShowMenu(false)}
                className="flexCenter py-3 border-b-[1px] border-gray-300 border-solid hover:bg-gray-400 hover:text-paragraph cursor-pointer"
              >
                <a className={pathname === "/members" ? "text-primary" : "text-white"} href="/members">
                  Member
                </a>
              </li>
              <li
                onClick={() => setShowMenu(false)}
                className="flexCenter py-3 border-b-[1px] border-gray-300 border-solid hover:bg-gray-400 hover:text-paragraph cursor-pointer"
              >
                <a className={pathname === "/contact" ? "text-primary" : "text-white"} href="/contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {showCart && (
        <div
          className="absolute top-0 left-0 h-screen w-screen bg-black opacity-20"
          onClick={() => setShowCart(false)}
        ></div>
      )}
    </header>
  ) : (
    <></>
  );
}

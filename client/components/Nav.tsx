"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const path = usePathname();

  const isActive = (href: string): string => {
    return path === href ? "nav-active" : "";
  };

  return (
    <nav className="flexCenter h-full max-w-[658px] lg:text-xs xl:text-sm font-normal tracking-[3px]">
      <Link
        className={`flexCenter xl:px-5 py-2 lg:px-4 text-nav hover:text-primary ${isActive(
          "/"
        )} transition duration-300 ease-linear`}
        href="/"
      >
        HOME
      </Link>
      <Link
        className={`flexCenter xl:px-5 py-2 lg:px-4 text-nav hover:text-primary ${isActive(
          "/shop"
        )} transition duration-300 ease-linear`}
        href="/shop"
      >
        SHOP
      </Link>
      <Link
        className={`flexCenter xl:px-5 py-2 lg:px-4 text-nav hover:text-primary ${isActive(
          "/about"
        )} transition duration-300 ease-linear`}
        href="/about"
      >
        ABOUT
      </Link>
      <Link
        className={`flexCenter xl:px-5 py-2 lg:px-4 text-nav hover:text-primary ${isActive(
          "/forum"
        )} transition duration-300 ease-linear`}
        href="/forum"
      >
        FORUM
      </Link>
      <Link
        className={`flexCenter xl:px-5 py-2 lg:px-4 text-nav hover:text-primary ${isActive(
          "/members"
        )} transition duration-300 ease-linear`}
        href="/members"
      >
        MEMBERS
      </Link>
      <Link
        className={`flexCenter xl:px-5 py-2 lg:px-4 text-nav hover:text-primary ${isActive(
          "/contact"
        )} transition duration-300 ease-linear`}
        href="/contact"
      >
        CONTACT
      </Link>
    </nav>
  );
}

"use client";

import { useState } from "react";
import { useAuth } from "context/AuthContext";
import { motion } from "framer-motion";
import { VscChromeClose } from "react-icons/vsc";
import Link from "next/link";
import DownIcon from "public/icons/DownIcon";
import GridViewIcon from "public/icons/GridViewIcon";
import ListViewIcon from "public/icons/ListViewIcon";
import SearchIcon from "public/icons/SearchIcon";
import Tippy from "@tippyjs/react";
import ProfileMember from "components/ProfileMember";
import { User } from "@/types";
import { useEffect } from "react";

export default function Member() {
  const { user } = useAuth();
  const [showMember, setShowMember] = useState<boolean>(false);
  const [showSort, setShowSort] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [memberChoose, setMemberChoose] = useState<string>("");
  const [typeShortBy, setTypeShortBy] = useState<string>("");
  const [displayView, setDisplayView] = useState<string>("grid");
  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/user/members`);
      const memberList = await res.json();
      if (memberList) setMembers(memberList);
    };
    fetchMembers();
  }, []);

  return (
    <motion.section
      className="flexCenter xl:mt-header-xl lg:mt-header-lg sms:mt-header-sm h-fit w-full bg-primary"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:gap-6 sms:gap-0 lg:w-9/12 sms:w-full min-h-[90vh] lg:mb-40 sms:mb-0 bg-white text-paragraph">
        <nav className="relative grid grid-cols-12 w-full lg:h-16 sms:h-17 px-6 lg:text-base sms:text-lg font-normal lg:border-b-0 sms:border-b-[1px] border-solid border-paragraph">
          <div className="lg:col-span-2 sms:col-span-6 h-full w-full lg:gap-10 sms:gap-0">
            <Tippy
              visible={showMember}
              interactive
              placement="bottom-start"
              arrow={false}
              className="translate-y-[-26px]"
              content={
                <div className="flex flex-col w-50 py-2 h-fit bg-white text-paragraph text-sm font-base border-[2px] border-solid border-gray-300 cursor-pointer rounded-none">
                  <span
                    onClick={() => {
                      setShowMember(false);
                      setMemberChoose("all");
                    }}
                    className="py-2 px-6 hover:bg-gray-100"
                  >
                    All members
                  </span>
                  <span
                    onClick={() => {
                      setShowMember(false);
                      setMemberChoose("admin");
                    }}
                    className="py-2 px-6 hover:bg-gray-100"
                  >
                    Admins
                  </span>
                  <span
                    onClick={() => {
                      setShowMember(false);
                      setMemberChoose("manager");
                    }}
                    className="py-2 px-6 hover:bg-gray-100"
                  >
                    Managers
                  </span>
                </div>
              }
              onClickOutside={() => setShowMember(false)}
              zIndex={10}
            >
              <div
                className="flex sms:justify-between sms:items-center lg:items-center lg:justify-start h-full w-full gap-3 lg:pr-0 sms:pr-6 lg:border-r-0 sms:border-r-[1px] border-solid border-paragraph cursor-pointer"
                onClick={() => setShowMember(true)}
              >
                <span>All member</span>
                <DownIcon width={11} height={6} />
              </div>
            </Tippy>
          </div>

          <Tippy
            visible={showSort}
            interactive
            placement="bottom-start"
            arrow={false}
            className="translate-y-[-26px]"
            content={
              <div className="flex flex-col w-50 py-2 h-fit bg-white text-paragraph text-sm font-base border-[2px] border-solid border-gray-300 cursor-pointer rounded-none">
                <span
                  onClick={() => {
                    setShowSort(false);
                    setTypeShortBy("default");
                  }}
                  className="py-2 px-6 hover:bg-gray-100"
                >
                  Default
                </span>
                <span
                  onClick={() => {
                    setShowSort(false);
                    setTypeShortBy("nofollow");
                  }}
                  className="py-2 px-6 hover:bg-gray-100"
                >
                  No. of followers
                </span>
                <span
                  onClick={() => {
                    setShowSort(false);
                    setTypeShortBy("newtoold");
                  }}
                  className="py-2 px-6 hover:bg-gray-100"
                >
                  Newest to oldest
                </span>
                <span
                  onClick={() => {
                    setShowSort(false);
                    setTypeShortBy("oldtonew");
                  }}
                  className="py-2 px-6 hover:bg-gray-100"
                >
                  Oldest to newest
                </span>
              </div>
            }
            onClickOutside={() => setShowSort(false)}
            zIndex={10}
          >
            <div
              className="lg:col-span-2 sms:col-span-4 flexCenter h-full w-full gap-2 lg:border-r-0 sms:border-r-[1px] border-solid border-paragraph cursor-pointer"
              onClick={() => setShowSort(true)}
            >
              <span className="lg:block sms:hidden font-light">Short by: </span>
              <span className="lg:hidden sms:block">Short by</span>
              <span className="lg:block sms:hidden">Default</span>
              <DownIcon width={11} height={6} />
            </div>
          </Tippy>

          <div className="lg:col-span-8 sms:col-span-2 lg:ml-auto h-full sms:w-full lg:w-[60%] flexEnd gap-6">
            <div
              className={`h-full w-fit lg:flex flexCenter sms:hidden ${displayView == "grid" && "text-primary"}`}
              onClick={() => setDisplayView("grid")}
            >
              <GridViewIcon width={14} height={14} />
            </div>

            <div
              className={`h-full w-fit lg:flex flexCenter sms:hidden ${displayView == "list" && "text-primary"}`}
              onClick={() => setDisplayView("list")}
            >
              <ListViewIcon width={16} height={20} />
            </div>

            <div className="flex-1 flexCenter h-full">
              <div className="flexCenter h-full w-full py-3">
                <div className="lg:relative flexCenter h-full w-full">
                  <div
                    className="lg:absolute left-0 flex sms:justify-end lg:justify-start items-center h-full sms:w-full lg:w-fit pr-1"
                    onClick={() => setShowInput((prev) => !prev)}
                  >
                    <div className="lg:hidden sms:block h-fit w-fit">
                      <SearchIcon width={30} height={30} />
                    </div>
                    <div className="lg:block sms:hidden h-fit w-fit">
                      <SearchIcon width={20} height={20} />
                    </div>
                  </div>

                  <div className="lg:flex sms:hidden h-full w-full">
                    <input
                      className="w-full h-full px-2 pl-6 text-sm border-b-[1px] border-solid border-gray-400 placeholder:text-sm outline-none focus:border-b-[2px] focus:border-paragraph"
                      type="text"
                      placeholder="Find a member..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute top-0 left-0 lg:hidden sms:flex w-full h-full z-10 bg-white"
            variants={{
              hidden: { x: "100%" },
              show: { x: "0" },
            }}
            transition={{ duration: 0.85 }}
            initial="hidden"
            animate={showInput ? "show" : "hidden"}
          >
            <div className="flexCenter h-full w-full">
              <div className="flexCenter left-0 h-full w-fit pl-6 pr-2" onClick={() => setShowInput((prev) => !prev)}>
                <SearchIcon width={30} height={30} />
              </div>

              <div className="flex-1 h-full">
                <input
                  className="w-full h-full pl-2 pr-4 text-lg placeholder:opacity-90 outline-none"
                  type="text"
                  placeholder="Find a member..."
                />
              </div>

              <div
                className="flexCenter h-full w-17 border-l-[1px] border-solid border-paragraph"
                onClick={() => setShowInput((prev) => !prev)}
              >
                <VscChromeClose style={{ width: 25, height: 25 }} />
              </div>
            </div>
          </motion.div>
        </nav>

        <main>
          {!user ? (
            <div className="flexCenter flex-col gap-4 p-16 lg:h-fit sms:min-h-[70vh]">
              <h1 className="text-2xl">Log in to see members</h1>
              <p className="max-w-[400px] text-center font-light">
                Log in to check out members profiles, make comments, follow posts & more.
              </p>
              <button className="mt-4 py-[12px] px-[66px] border-primary border-2 text-white text-sm bg-primary hover:text-primary hover:bg-paragraph hover:border-primary hover:border-2 transition duration-300 ease-linear">
                <Link href="/login">Login</Link>
              </button>
            </div>
          ) : (
            <div className="w-full h-full px-4 py-12">
              <ProfileMember members={members} />
            </div>
          )}
        </main>
      </div>
    </motion.section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { VscChromeClose } from "react-icons/vsc";
import Introduce from "components/Introduce";
import SearchIcon from "public/icons/SearchIcon";
import MultiplyIcon from "public/icons/MultiplyIcon";
import DemoModel from "components/DemoModel";

export default function ForumPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [showDemo, setShowDemo] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [typePosts, setTypePosts] = useState<string>("categories");

  return (
    <motion.section
      className="xl:mt-header-xl lg:mt-header-lg sms:mt-header-sm"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Introduce image="/images/background-forum.webp" page="forum" />

      <main className="flexCenter w-full h-fit bg-transparent text-paragraph lg:pt-10 sms:pt-0 pb-20">
        <div className="lg:w-8/12 sms:w-full h-fit font-light">
          <nav className="relative w-full h-[3.75rem] grid grid-cols-12 grid-rows-1 lg:px-6 sms:px-0 sms:border-b-none lg:border-b-[1px] border-solid lg:border-gray-400 sms:border-paragraph text-base lg:font-light sms:font-normal">
            <div className="flexCenter lg:col-span-4 sms:col-span-10 h-full lg:border-y-0 sms:border-y-[1px] border-solid border-paragraph">
              <div className="flexCenter w-1/3 h-full cursor-pointer sms:border-r-[1px] lg:border-r-0 border-solid border-paragraph">
                <div
                  className={typePosts === "categories" ? "text-primary" : "text-paragraph"}
                  onClick={() => setTypePosts("categories")}
                >
                  Categories
                </div>
              </div>
              <div className="flexCenter w-1/3 h-full cursor-pointer sms:border-r-[1px] lg:border-r-0 border-solid border-paragraph">
                <div
                  className={typePosts === "all" ? "text-primary" : "text-paragraph"}
                  onClick={() => setTypePosts("all")}
                >
                  All Posts
                </div>
              </div>
              <div className="flexCenter w-1/3 h-full cursor-pointer sms:border-r-[1px] lg:border-r-0 border-solid border-paragraph">
                <div
                  className={typePosts === "my" ? "text-primary" : "text-paragraph"}
                  onClick={() => setTypePosts("my")}
                >
                  My posts
                </div>
              </div>
            </div>

            <div
              className="lg:col-span-8 sms:col-span-2 flex items-center lg:justify-end sms:justify-center lg:py-3 sms:py-0 h-full sms:border-y-[1px] lg:border-y-0 border-solid border-paragraph"
              onClick={() => setShowInput(true)}
            >
              <div className="relative flex h-full lg:border-[1px] sms:border-0 border-solid lg:border-gray-400">
                <div className="absolute lg:block sms:hidden top-[50%] left-2 translate-y-[-50%] cursor-pointer">
                  <SearchIcon width={24} height={24} fill="gray" />
                </div>

                <div className="flexCenter w-full h-full py-3 lg:hidden sms:block cursor-pointer">
                  <SearchIcon width={30} height={30} fill="#1f1f1f" />
                </div>

                <input
                  id="searchPost"
                  type="text"
                  placeholder="Search"
                  value={searchValue}
                  className="lg:block sms:hidden h-full w-[12.75rem] pl-9 pr-2 bg-transparent outline-none transition-all duration-300 ease-linear focus:w-[19.25rem]"
                  onChange={(e) => setSearchValue(e.target.value)}
                />

                {searchValue !== "" && (
                  <div
                    className="flexCenter w-fit h-full px-2 cursor-pointer transition-all duration-300 ease-linear"
                    onClick={() => setSearchValue("")}
                  >
                    <MultiplyIcon />
                  </div>
                )}
              </div>
            </div>

            <div className="lg:hidden sms:block">
              <motion.div
                className="absolute top-0 left-0 bg-white w-screen h-full z-30 lg:hidden sms:block border-y-[1px] border-solid border-paragraph"
                variants={{
                  hidden: { x: "100%" },
                  show: { x: "0" },
                }}
                transition={{ duration: 0.85 }}
                initial="hidden"
                animate={showInput ? "show" : "hidden"}
              >
                <div className="flexCenter h-full w-full">
                  <div className="flexCenter left-0 h-full w-fit pl-4 pr-2">
                    <SearchIcon width={30} height={30} fill="#1f1f1f" />
                  </div>

                  <div className="flex-1 h-full">
                    <input
                      className="w-full h-full px-2 text-lg placeholder:opacity-90 outline-none"
                      type="text"
                      placeholder="Find a member..."
                    />
                  </div>

                  <div
                    className="flexCenter h-full w-16 border-l-[1px] border-solid border-paragraph"
                    onClick={() => setShowInput(false)}
                  >
                    <VscChromeClose style={{ width: 25, height: 25 }} />
                  </div>
                </div>
              </motion.div>
            </div>
          </nav>

          <div className="text-center h-fit w-full pt-16 pb-10">
            <h1 className="font-condensed mb-6 text-5xl font-medium">FITNESS AND HEALTH FORUM</h1>
            <p className="mx-auto text-xl max-w-[45rem]">
              Welcome to our forum - your source for all things fitness. Explore the conversation and connect with other
              enthusiasts.
            </p>
          </div>

          <div className="w-full h-fit py-5 text-center">
            <button
              className="py-[8px] px-4 border-primary border-2 text-white text-sm bg-primary hover:text-primary hover:bg-paragraph hover:border-primary hover:border-2 transition duration-300 ease-linear"
              onClick={() => setShowDemo(true)}
            >
              Create New Post
            </button>
          </div>
        </div>
      </main>

      {showDemo && <DemoModel setShowDemo={setShowDemo} />}
    </motion.section>
  );
}

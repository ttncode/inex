"use client";

import { useState } from "react";
import { useProductFilter } from "context/ProductFilterContext";
import { motion } from "framer-motion";
import Tippy from "@tippyjs/react";
import Introduce from "components/Introduce";
import ProductList from "components/ProductList";
import Sidebar from "components/Sidebar";
import Filter from "components/Filter";
import DownIcon from "public/icons/DownIcon";
import DoubleArrowIcon from "public/icons/DoubleArrowIcon";

export default function Shop() {
  const { setSortByEvent } = useProductFilter();
  const [showSortBy, setShowSortBy] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  return (
    <motion.section
      className="relative xl:mt-header-xl lg:mt-header-lg sms:mt-header-sm bg-line"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Introduce image="/images/background-shop.webp" page="shop" />
      <main className="px-10 pt-20 h-fit">
        <div className="grid lg:grid-cols-5 sms:grid-cols-1 h-full">
          <div className="lg:block sms:hidden">
            <Sidebar />
          </div>

          <div className="col-span-4 ml-2 mb-6">
            <div className="flex flex-col gap-8">
              <div className="lg:h-10 sms:h-12 bg-transparent flexEnd">
                <div
                  className="lg:hidden sms:block flex-1 h-full p-3 bg-paragraph text-white text-xl font-base cursor-pointer mr-4"
                  onClick={() => setShowFilter(true)}
                >
                  <span className="flexCenter w-full h-full">Filter</span>
                </div>

                <Tippy
                  visible={showSortBy}
                  interactive
                  placement="bottom-end"
                  arrow={false}
                  content={
                    <div className="flex flex-col w-50 h-fit bg-paragraph text-white text-sm font-base cursor-pointer rounded-none">
                      <span
                        onClick={() => {
                          setSortByEvent("default");
                          setShowSortBy(false);
                        }}
                        className="py-2 px-4 hover:bg-gray-700"
                      >
                        Default
                      </span>
                      <span
                        onClick={() => {
                          setSortByEvent("priceInc");
                          setShowSortBy(false);
                        }}
                        className="py-2 px-4 hover:bg-gray-700"
                      >
                        Price (low to high)
                      </span>
                      <span
                        onClick={() => {
                          setSortByEvent("priceDesc");
                          setShowSortBy(false);
                        }}
                        className="py-2 px-4 hover:bg-gray-700"
                      >
                        Price (high to low)
                      </span>
                      <span
                        onClick={() => {
                          setSortByEvent("nameInc");
                          setShowSortBy(false);
                        }}
                        className="py-2 px-4 hover:bg-gray-700"
                      >
                        Name A-Z
                      </span>
                      <span
                        onClick={() => {
                          setSortByEvent("nameDesc");
                          setShowSortBy(false);
                        }}
                        className="py-2 px-4 hover:bg-gray-700"
                      >
                        Name Z-A
                      </span>
                    </div>
                  }
                  onClickOutside={() => setShowSortBy(false)}
                  zIndex={10}
                >
                  <div
                    className="flexBetween h-full lg:w-50 sms:w-12 lg:p-3 sms:p-0 bg-paragraph text-white text-sm font-base cursor-pointer"
                    onClick={() => setShowSortBy((prev) => !prev)}
                  >
                    <span className="lg:block sms:hidden">Sort by</span>
                    <div className={`${showSortBy && "rotate-180"} lg:block sms:hidden`}>
                      <DownIcon width={14} height={14} />
                    </div>

                    <div className="w-full h-full lg:hidden sms:block text-lg">
                      <div className="flexCenter w-full h-full">
                        <DoubleArrowIcon width={32} height={32} />
                      </div>
                    </div>
                  </div>
                </Tippy>
              </div>

              <main className="grid grid-flow-row gap-6 h-full w-full">
                <ProductList newArrival={false} />
              </main>
            </div>
          </div>
        </div>
      </main>

      <Filter showFilter={showFilter} setShowFilter={setShowFilter} />
    </motion.section>
  );
}

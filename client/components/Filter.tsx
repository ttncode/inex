"use client";

import { useEffect, useState } from "react";
import { useProductFilter } from "context/ProductFilterContext";
import { VscChromeClose } from "react-icons/vsc";
import { motion } from "framer-motion";
import RangeSlider from "./RangeSlider";
import ProductColor from "./ProductColor";
import MinusIcon from "public/icons/MinusIcon";
import PlusIcon from "public/icons/PlusIcon";

export default function Filter({ showFilter, setShowFilter }: { showFilter: boolean; setShowFilter: Function }) {
  const { type, setTypeEvent, setColorEvent, setRangePriceEvent } = useProductFilter();
  const [showOption, setShowOption] = useState({
    collection: true,
    price: false,
    color: false,
    size: false,
  });

  const rangePriceDefault = {
    min: 9,
    max: 40,
  };

  const handleClearFilters = () => {
    setTypeEvent("all");
    setColorEvent("");
    setRangePriceEvent(rangePriceDefault);
  };

  const handleApplyFilter = () => {
    setShowFilter(false);
  };

  useEffect(() => {
    if (showFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showFilter]);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-screen h-screen z-50 flex flex-col bg-white text-paragraph"
      variants={{
        hidden: { opacity: 0, x: "100%" },
        show: { opacity: 1, x: "0" },
      }}
      transition={{ duration: 0.85 }}
      initial="hidden"
      animate={showFilter ? "show" : "hidden"}
    >
      <div className="flex flex-col w-full h-full">
        <div className="flex border-b-[1px] border-gray-500 border-solid">
          <span className="text-2xl px-6 py-4">Filter by</span>
          <div
            className="h-full w-fit px-4 py-4 flex justify-center items-center text-2xl ml-auto cursor-pointer mr-3"
            onClick={() => setShowFilter(false)}
          >
            <VscChromeClose />
          </div>
        </div>

        <main className="text-xl h-[90vh] overflow-y-scroll">
          <div className="flex flex-col gap-5 py-5 px-6 border-b-[1px] border-gray-500 border-solid">
            <div className="flexBetween">
              <span>Collection</span>
              <div className="fill-paragraph">
                {showOption.collection ? (
                  <div
                    className="h-full w-fit"
                    onClick={() =>
                      setShowOption((prev) => ({
                        ...prev,
                        collection: !showOption.collection,
                      }))
                    }
                  >
                    <MinusIcon width={24} height={24} />
                  </div>
                ) : (
                  <div
                    className="h-full w-fit"
                    onClick={() => {
                      setShowOption((prev) => ({
                        ...prev,
                        collection: !showOption.collection,
                      }));
                    }}
                  >
                    <PlusIcon width={24} height={24} />
                  </div>
                )}
              </div>
            </div>

            {showOption.collection && (
              <div className="flex flex-col w-full h-fit text-base font-light opacity-80">
                <span
                  onClick={() => setTypeEvent("all")}
                  className={`${
                    type === "all" ? "select-active hover:opacity-100" : ""
                  } hover:opacity-70 py-1 cursor-pointer`}
                >
                  All
                </span>
                <span
                  onClick={() => setTypeEvent("sportBras")}
                  className={`${
                    type === "sportBras" ? "select-active hover:opacity-100" : ""
                  } hover:opacity-60 py-1 cursor-pointer`}
                >
                  Sports Bras
                </span>
                <span
                  onClick={() => setTypeEvent("tankTop")}
                  className={`${
                    type === "tankTop" ? "select-active hover:opacity-100" : ""
                  } hover:opacity-60 py-1 cursor-pointer`}
                >
                  Tank Tops
                </span>
                <span
                  onClick={() => setTypeEvent("legging")}
                  className={`${
                    type === "legging" ? "select-active hover:opacity-100" : ""
                  } hover:opacity-60 py-1 cursor-pointer`}
                >
                  Leggings
                </span>
                <span
                  onClick={() => setTypeEvent("jacket")}
                  className={`${
                    type === "jacket" ? "select-active hover:opacity-100" : ""
                  } hover:opacity-60 py-1 cursor-pointer`}
                >
                  Jackets
                </span>
                <span
                  onClick={() => setTypeEvent("short")}
                  className={`${
                    type === "short" ? "select-active hover:opacity-100" : ""
                  } hover:opacity-60 py-1 cursor-pointer`}
                >
                  Short
                </span>
                <span
                  onClick={() => setTypeEvent("bestSeller")}
                  className={`${
                    type === "bestSeller" ? "select-active hover:opacity-100" : ""
                  } hover:opacity-60 py-1 cursor-pointer`}
                >
                  Best Sellers
                </span>
                <span
                  onClick={() => setTypeEvent("newArrival")}
                  className={`${
                    type === "newArrival" ? "select-active hover:opacity-100" : ""
                  } hover:opacity-60 py-1 cursor-pointer`}
                >
                  New Arrivals
                </span>
                <span
                  onClick={() => setTypeEvent("liked")}
                  className={`${
                    type === "liked" ? "select-active hover:opacity-100" : ""
                  } hover:opacity-60 py-1 cursor-pointer`}
                >
                  List Liked
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6 py-5 border-b-[1px] border-gray-500 border-solid">
            <div className="flexBetween px-6">
              <span>Price</span>
              <div>
                {showOption.price ? (
                  <div
                    className="h-full w-fit"
                    onClick={() => {
                      setShowOption((prev) => ({
                        ...prev,
                        price: !showOption.price,
                      }));
                    }}
                  >
                    <MinusIcon width={24} height={24} />
                  </div>
                ) : (
                  <div
                    className="h-full w-fit"
                    onClick={() => {
                      setShowOption((prev) => ({
                        ...prev,
                        price: !showOption.price,
                      }));
                    }}
                  >
                    <PlusIcon width={24} height={24} />
                  </div>
                )}
              </div>
            </div>

            {showOption.price && (
              <div className="py-2 px-6">
                <RangeSlider min={rangePriceDefault.min} max={rangePriceDefault.max} step="1.55" />
              </div>
            )}
          </div>

          <ProductColor colorOption={showOption.color} setShowOption={setShowOption} />

          <div className="flex flex-col gap-5 py-5 border-b-[1px] border-gray-500 border-solid">
            <div className="flexBetween px-6">
              <span>Size</span>
              <div>
                {showOption.size ? (
                  <div
                    className="h-full w-fit"
                    onClick={() =>
                      setShowOption((prev) => ({
                        ...prev,
                        size: !showOption.size,
                      }))
                    }
                  >
                    <MinusIcon width={24} height={24} />
                  </div>
                ) : (
                  <div
                    className="h-full w-fit"
                    onClick={() => {
                      setShowOption((prev) => ({
                        ...prev,
                        size: !showOption.size,
                      }));
                    }}
                  >
                    <PlusIcon width={24} height={24} />
                  </div>
                )}
              </div>
            </div>

            {showOption.size && (
              <div className="flex flex-col gap-2 px-6">
                <div className="flex items-center text-base font-light">
                  <input type="checkbox" className="mr-2 h-4 w-4 hidden" id="largeCheckbox" />
                  <label htmlFor="largeCheckbox" className="checkbox-label">
                    <span className="custom-checkbox"></span>
                    Large
                  </label>
                </div>
                <div className="flex items-center text-base font-light">
                  <input type="checkbox" className="mr-2 h-4 w-4 hidden" id="mediumCheckbox" />
                  <label htmlFor="mediumCheckbox" className="checkbox-label">
                    <span className="custom-checkbox"></span>
                    Medium
                  </label>
                </div>
                <div className="flex items-center text-base font-light">
                  <input type="checkbox" className="mr-2 h-4 w-4 hidden" id="smallCheckbox" />
                  <label htmlFor="smallCheckbox" className="checkbox-label">
                    <span className="custom-checkbox"></span>
                    Small
                  </label>
                </div>
              </div>
            )}
          </div>
        </main>

        <div className="flexBetween px-8 w-full py-4 text-base z-30 bg-white border-t-[1px] border-paragraph border-solid">
          <button
            className="py-2 w-[45%] border-[1px] border-solid border-gray-400 text-gray-400"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
          <button className="py-2 w-[45%] text-white bg-paragraph" onClick={handleApplyFilter}>
            Apply
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

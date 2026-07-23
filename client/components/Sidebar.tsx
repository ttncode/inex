"use client";

import { useState } from "react";
import { useProductFilter } from "context/ProductFilterContext";
import { AiOutlineClear } from "react-icons/ai";
import RangeSlider from "./RangeSlider";
import ProductColor from "./ProductColor";
import MinusIcon from "public/icons/MinusIcon";
import PlusIcon from "public/icons/PlusIcon";

export default function Sidebar() {
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

  return (
    <nav className="col-span-1 w-full h-full bg-paragraph p-5 text-white flex-col">
      <div className="pb-5 border-b-[1px] border-gray-500 border-solid">
        <span className="text-2xl px-0 py-0">Filter by</span>
      </div>
      <main className="flex flex-col text-sm">
        <div className="flex flex-col gap-5 px-0 py-5 border-b-[1px] border-gray-500 border-solid">
          <div className="flexBetween">
            <span className="text-sm">Collection</span>
            <div>
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
                  <MinusIcon />
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
                  <PlusIcon />
                </div>
              )}
            </div>
          </div>

          {showOption.collection && (
            <div className="flex flex-col w-full h-fit text-sm font-light opacity-80">
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
          <div className="flexBetween px-0">
            <span className="text-sm">Price</span>
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
                  <MinusIcon />
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
                  <PlusIcon />
                </div>
              )}
            </div>
          </div>

          {showOption.price && (
            <div className="py-2 px-1">
              <RangeSlider min={rangePriceDefault.min} max={rangePriceDefault.max} step="1.55" />
            </div>
          )}
        </div>

        <ProductColor colorOption={showOption.color} setShowOption={setShowOption} />

        <div className="flex flex-col gap-5 py-5 border-b-[1px] border-gray-500 border-solid">
          <div className="flexBetween px-0">
            <span className="text-sm-base">Size</span>
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
                  <MinusIcon />
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
                  <PlusIcon />
                </div>
              )}
            </div>
          </div>

          {showOption.size && (
            <div className="flex flex-col gap-2 px-0">
              <div className="flex items-center text-xs font-light">
                <input type="checkbox" className="mr-2 h-4 w-4 hidden" id="largeCheckbox" />
                <label htmlFor="largeCheckbox" className="checkbox-label">
                  <span className="custom-checkbox"></span>
                  Large
                </label>
              </div>
              <div className="flex items-center text-xs font-light">
                <input type="checkbox" className="mr-2 h-4 w-4 hidden" id="mediumCheckbox" />
                <label htmlFor="mediumCheckbox" className="checkbox-label">
                  <span className="custom-checkbox"></span>
                  Medium
                </label>
              </div>
              <div className="flex items-center text-xs font-light">
                <input type="checkbox" className="mr-2 h-4 w-4 hidden" id="smallCheckbox" />
                <label htmlFor="smallCheckbox" className="checkbox-label">
                  <span className="custom-checkbox"></span>
                  Small
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="flexStart gap-1 py-4 hover:opacity-75 cursor-pointer" onClick={handleClearFilters}>
          <span>Clear Filters</span>
          <AiOutlineClear />
        </div>
      </main>
    </nav>
  );
}

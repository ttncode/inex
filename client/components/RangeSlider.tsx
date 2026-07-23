"use client";

import { useState } from "react";
import { useProductFilter } from "../context/ProductFilterContext";

const RangeSlider = ({ min, max, step }: any) => {
  const { setRangePriceEvent } = useProductFilter();
  const [minValue, setMinValue] = useState<number>(Number(min));
  const [maxValue, setMaxValue] = useState<number>(Number(max));

  const handleMin = (e: any) => {
    const newMinValue = parseInt(e.target.value);
    if (newMinValue < maxValue) {
      setMinValue(newMinValue);
    }
  };

  const handleMax = (e: any) => {
    const newMaxValue = parseInt(e.target.value);
    if (newMaxValue > minValue) {
      setMaxValue(newMaxValue);
    }
  };

  const handleSetRangePrice = () => {
    setRangePriceEvent({ min: minValue, max: maxValue });
  };

  return (
    <div className="flex flex-col w-full h-full lg:text-white sms:text-paragraph">
      <div className="relative">
        <input
          id="rangePrice"
          onChange={handleMin}
          onMouseUp={handleSetRangePrice}
          onTouchEnd={handleSetRangePrice}
          type="range"
          min={min}
          step={step}
          max={max}
          value={minValue}
          className="absolute w-full -top-1 h-[1px] lg:text:white sms:text-paragraph lg:bg-white sms:bg-paragraph appearance-none pointer-events-none cursor-pointer"
        />

        <input
          id="rangePrice"
          onChange={handleMax}
          onMouseUp={handleSetRangePrice}
          onTouchEnd={handleSetRangePrice}
          type="range"
          min={min}
          step={step}
          max={max}
          value={maxValue}
          className="absolute w-full -top-1 h-[1px] lg:text:white sms:text-paragraph lg:bg-white sms:bg-paragraph appearance-none pointer-events-none cursor-pointer"
        />
      </div>
      <div className="flexBetween pt-4 lg:text-white sms:text-paragraph lg:text-xs lg:text-thin sms:text-lg sms:font-normal">
        <span>{`$${minValue}.00`}</span>
        <span>{`$${maxValue}.00`}</span>
      </div>
    </div>
  );
};

export default RangeSlider;

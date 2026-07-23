"use client";

import { createContext, useContext, useState } from "react";
import { ProductFilterContextValue, RangePrice } from "@/types";

const ProductFilterContext = createContext<ProductFilterContextValue>({
  rangePrice: { min: 0, max: 0 },
  setRangePriceEvent: () => {},
  type: "all",
  setTypeEvent: () => {},
  color: [],
  setColorEvent: () => {},
  sortBy: "default",
  setSortByEvent: () => {},
  showFilter: false,
  setShowFilter: () => {},
});

export default function ProductFilterProvider({ children }: { children: React.ReactNode }) {
  const [rangePrice, setRangePrice] = useState<RangePrice>({ min: 0, max: 0 });
  const [type, setType] = useState<string>("all");
  const [color, setColor] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("default");

  const setRangePriceEvent = (data: RangePrice) => {
    setRangePrice(data);
  };
  const setTypeEvent = (data: string) => {
    setType(data);
  };
  const setSortByEvent = (data: string) => {
    setSortBy(data);
  };
  const setColorEvent = (data: string) => {
    if (data === "") return setColor([]);
    if (color.length > 0 && color.includes(data)) {
      setColor(color.filter((item) => item !== data));
    } else {
      setColor([...color, data]);
    }
  };

  const contextData = {
    rangePrice,
    setRangePriceEvent,
    type,
    setTypeEvent,
    color,
    setColorEvent,
    sortBy,
    setSortByEvent,
    showFilter,
    setShowFilter,
  };

  return <ProductFilterContext.Provider value={contextData}>{children}</ProductFilterContext.Provider>;
}

export const useProductFilter = () => useContext(ProductFilterContext);

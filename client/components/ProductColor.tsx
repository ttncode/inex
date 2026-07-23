"use client";

import { useState } from "react";
import { useProductFilter } from "../context/ProductFilterContext";
import MinusIcon from "public/icons/MinusIcon";
import PlusIcon from "public/icons/PlusIcon";

export default function ProductColor({ colorOption, setShowOption }: any) {
  const { color, setColorEvent } = useProductFilter();
  const [colorHover, setColorHover] = useState<string>("");

  const isColorInArray = (colorName: string) => color.includes(colorName);

  return (
    <div className="flex flex-col gap-6 py-5 border-b-[1px] border-gray-500 border-solid">
      <div className="flexBetween lg:text-white sms:text-paragraph lg:px-0 sms:px-6">
        <span className="lg:text-sm sms:text-xl">{`Color: ${colorHover}`}</span>
        <div>
          {colorOption ? (
            <div
              className="h-full w-fit"
              onClick={() =>
                setShowOption((prev: Object) => ({
                  ...prev,
                  color: !colorOption,
                }))
              }
            >
              <MinusIcon className="lg:w-[16px] lg:h-[16px] sms:w-[24px] sms:h-[24px]" />
            </div>
          ) : (
            <div
              className="h-full w-fit"
              onClick={() => {
                setShowOption((prev: Object) => ({
                  ...prev,
                  color: !colorOption,
                }));
              }}
            >
              <PlusIcon className="lg:w-[16px] lg:h-[16px] sms:w-[24px] sms:h-[24px]" />
            </div>
          )}
        </div>
      </div>

      {colorOption && (
        <div className="grid grid-cols-7 gap-2 lg:px-0 sms:px-6">
          <div
            className={`flexCenter w-[26px] h-[26px] ${
              isColorInArray("Blue") ? "border-gray-400 border-[1px] border-solid" : ""
            }}`}
          >
            <div
              onClick={() => setColorEvent("Blue")}
              onMouseMove={() => setColorHover("Blue")}
              onMouseLeave={() => setColorHover("")}
              className={
                "w-[20px] h-[20px] rounded-full border-white border-solid border-[1px] hover:opacity-75 bg-blue"
              }
            ></div>
          </div>
          <div
            className={`flexCenter w-[26px] h-[26px] ${
              isColorInArray("Brown") ? "border-gray-400 border-[1px] border-solid" : ""
            }}`}
          >
            <div
              onClick={() => setColorEvent("Brown")}
              onMouseMove={() => setColorHover("Brown")}
              onMouseLeave={() => setColorHover("")}
              className={
                "w-[20px] h-[20px] rounded-full border-white border-solid border-[1px] hover:opacity-75 bg-brown"
              }
            ></div>
          </div>
          <div
            className={`flexCenter w-[26px] h-[26px] ${
              isColorInArray("Fuchsia") ? "border-gray-400 border-[1px] border-solid" : ""
            }}`}
          >
            <div
              onClick={() => setColorEvent("Fuchsia")}
              onMouseMove={() => setColorHover("Fuchsia")}
              onMouseLeave={() => setColorHover("")}
              className={
                "w-[20px] h-[20px] rounded-full border-white border-solid border-[1px] hover:opacity-75 bg-fuchsia"
              }
            ></div>
          </div>
          <div
            className={`flexCenter w-[26px] h-[26px] ${
              isColorInArray("Green") ? "border-gray-400 border-[1px] border-solid" : ""
            }}`}
          >
            <div
              onClick={() => setColorEvent("Green")}
              onMouseMove={() => setColorHover("Green")}
              onMouseLeave={() => setColorHover("")}
              className={
                "w-[20px] h-[20px] rounded-full border-white border-solid border-[1px] hover:opacity-75 bg-green"
              }
            ></div>
          </div>
          <div
            className={`flexCenter w-[26px] h-[26px] ${
              isColorInArray("Navy") ? "border-gray-400 border-[1px] border-solid" : ""
            }}`}
          >
            <div
              onClick={() => setColorEvent("Navy")}
              onMouseMove={() => setColorHover("Navy")}
              onMouseLeave={() => setColorHover("")}
              className={
                "w-[20px] h-[20px] rounded-full border-white border-solid border-[1px] hover:opacity-75 bg-navy"
              }
            ></div>
          </div>
          <div
            className={`flexCenter w-[26px] h-[26px] ${
              isColorInArray("Orange") ? "border-gray-400 border-[1px] border-solid" : ""
            }}`}
          >
            <div
              onClick={() => setColorEvent("Orange")}
              onMouseMove={() => setColorHover("Orange")}
              onMouseLeave={() => setColorHover("")}
              className={
                "w-[20px] h-[20px] rounded-full border-white border-solid border-[1px] hover:opacity-75 bg-orange"
              }
            ></div>
          </div>
          <div
            className={`flexCenter w-[26px] h-[26px] ${
              isColorInArray("Purple") ? "border-gray-400 border-[1px] border-solid" : ""
            }}`}
          >
            <div
              onClick={() => setColorEvent("Purple")}
              onMouseMove={() => setColorHover("Purple")}
              onMouseLeave={() => setColorHover("")}
              className={
                "w-[20px] h-[20px] rounded-full border-white border-solid border-[1px] hover:opacity-75 bg-purple"
              }
            ></div>
          </div>
          <div
            className={`flexCenter w-[26px] h-[26px] ${
              isColorInArray("Red") ? "border-gray-400 border-[1px] border-solid" : ""
            }}`}
          >
            <div
              onClick={() => setColorEvent("Red")}
              onMouseMove={() => setColorHover("Red")}
              onMouseLeave={() => setColorHover("")}
              className={
                "w-[20px] h-[20px] rounded-full border-white border-solid border-[1px] hover:opacity-75 bg-red"
              }
            ></div>
          </div>
          <div
            className={`flexCenter w-[26px] h-[26px] ${
              isColorInArray("Royal Blue") ? "border-gray-400 border-[1px] border-solid" : ""
            }}`}
          >
            <div
              onClick={() => setColorEvent("Royal Blue")}
              onMouseMove={() => setColorHover("Royal Blue")}
              onMouseLeave={() => setColorHover("")}
              className={
                "w-[20px] h-[20px] rounded-full border-white border-solid border-[1px] hover:opacity-75 bg-royalblue"
              }
            ></div>
          </div>
          <div
            className={`flexCenter w-[26px] h-[26px] ${
              isColorInArray("Teal") ? "border-gray-400 border-[1px] border-solid" : ""
            }}`}
          >
            <div
              onClick={() => setColorEvent("Teal")}
              onMouseMove={() => setColorHover("Teal")}
              onMouseLeave={() => setColorHover("")}
              className={
                "w-[20px] h-[20px] rounded-full border-white border-solid border-[1px] hover:opacity-75 bg-teal"
              }
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import Image from "next/image";
import Tippy from "@tippyjs/react";
import DownIcon from "public/icons/DownIcon";
import MinusIcon from "public/icons/MinusIcon";
import PlusIcon from "public/icons/PlusIcon";
import { useEffect, useState } from "react";
import { CartProduct, InfoCartProduct, Product } from "@/types";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useCartState } from "context/CartStateContext";
import { motion } from "framer-motion";

type Params = {
  params: {
    id: string;
  };
};

export default function ProductView({ params }: Params) {
  const router = useRouter();
  const { onAdd } = useCartState();
  const [product, setProduct] = useState<Product | null>(null);
  const [imageShow, setImageShow] = useState<string>("");
  const [productLiked, setProductLiked] = useState<Product[]>([]);
  const [showDetail, setShowDetail] = useState<Record<string, boolean>>({
    detail: true,
    return: false,
    shipping: false,
  });
  const [infoCartProduct, setInfoCartProduct] = useState<InfoCartProduct>({
    size: "",
    color: "default",
    quantity: 1,
  });
  const [showNotification, setShowNotification] = useState({
    size: false,
    color: false,
  });

  const handleAddProduct = () => {
    if (infoCartProduct?.color === "" && infoCartProduct?.size === "") {
      return setShowNotification({ color: true, size: true });
    }
    if (product && !product?.color.includes("default") && infoCartProduct?.color === "") {
      return setShowNotification((prev) => ({ ...prev, color: true }));
    }
    if (infoCartProduct?.size === "") {
      return setShowNotification((prev) => ({ ...prev, size: true }));
    }

    if (!product) return;
    const productCart: CartProduct = {
      ...product,
      image: imageShow,
      size: infoCartProduct.size,
      color: infoCartProduct.color || "default",
      quantity: infoCartProduct.quantity,
    };
    onAdd(productCart);
  };

  const handleToggleLiked = () => {
    if (!product) return;

    if (productLiked.some((p) => p._id === product._id)) {
      const updateProductLiked = productLiked.filter((likedProduct) => likedProduct._id !== product._id);
      setProductLiked(updateProductLiked);
      localStorage.setItem("productLiked", JSON.stringify(updateProductLiked));
    } else {
      const updateProductLiked = [...productLiked, product];
      setProductLiked(updateProductLiked);
      localStorage.setItem("productLiked", JSON.stringify(updateProductLiked));
    }
  };

  useEffect(() => {
    const productLikedLS = localStorage.getItem("productLiked");
    if (productLikedLS && productLikedLS.length > 0) {
      setProductLiked(JSON.parse(productLikedLS));
    }
  }, []);

  useEffect(() => {
    const fetchProduct = async (id: string) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT!}/api/product/${id}`);
        const productData = await response.json();
        setProduct(productData);
        setImageShow(productData?.image[0][productData?.color[0]]);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchProduct(params.id);
  }, [params]);

  return (
    <motion.section
      className="flexCenter xl:mt-header-xl lg:mt-header-lg sms:mt-header-sm w-full h-fit transition-all duration-500 ease-linear"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:w-2/3 sms:w-full lg:px-0 sms:px-10">
        <nav className="flexCenter w-full py-16 text-paragraph text-lg font-roboto">
          <div className="flexBetween w-full lg:flex sms:hidden">
            <div className="flex">
              <Link href={"/"} className="mr-1 hover:opacity-70">
                Home
              </Link>
              /
              <Link href={"/shop"} className="mx-1 hover:opacity-70">
                Shop
              </Link>
              /
              <Link href={"/view"} className="flexCenter text-text text-base hover:opacity-70">
                <span className="pt-1 ml-1">{product?._id}</span>
              </Link>
            </div>

            <div className="flex cursor-pointer">
              <div onClick={() => router.back()} className="flexCenter gap-2 hover:opacity-70">
                <DownIcon width={14} height={14} style={{ transform: "rotate(90deg)" }} />
                Prev
              </div>
              <span className="mx-2 text-text">|</span>
              <div onClick={() => router.forward()} className="flexCenter gap-2 hover:opacity-70">
                Next
                <DownIcon width={14} height={14} style={{ transform: "rotate(-90deg)" }} />
              </div>
            </div>
          </div>

          <div className="flexStart w-full lg:hidden sms:flex">
            <div onClick={() => router.back()} className="flexCenter gap-2 hover:opacity-70">
              <DownIcon width={14} height={14} style={{ transform: "rotate(90deg)" }} />
              Back To Shop
            </div>
          </div>
        </nav>

        <main className="flex lg:flex-row sms:flex-col text-paragraph pb-20">
          <div className="lg:w-[33.125rem] sms:w-full">
            {product?.image[0] && (
              <Image
                src={imageShow || ""}
                blurDataURL={imageShow}
                className="object-cover border border-gray-400 border-solid"
                alt={product?.name || ""}
                loading="lazy"
                width={500}
                height={500}
              />
            )}

            <div className="flex gap-2 mx-6 my-3 h-[3.125rem] w-full pr-6">
              {product?.color?.map((colorItem, index) => (
                <Image
                  key={index}
                  src={product?.image[index][colorItem] || ""}
                  blurDataURL={product?.image[index][colorItem]}
                  onClick={() => setImageShow(product?.image[index][colorItem])}
                  className={`object-cover ${
                    imageShow === product?.image[index][colorItem] && "border border-gray-400 border-solid"
                  }`}
                  alt="clothes.pnj"
                  loading="lazy"
                  width={50}
                  height={50}
                />
              ))}
            </div>
            <p className="lg:block sms:hidden text-left mt-8 pr-6 text-lg font-light">{product?.description}</p>
          </div>

          <div className="flex flex-col flex-1 gap-1 lg:py-1 lg:pt-0 sms:py-0 sms:pt-10">
            <h1 className="text-primary text-3xl font-base">{product?.name}</h1>
            <div className="text-sm font-light">{product?.storeCode}</div>
            <span className="mt-4 mb-4 text-lg">{product?.price}</span>
            <span className="text-base font-light">Size</span>

            <div className="relative w-full">
              <select
                name="size"
                id="size"
                className="w-full p-2 bg-white cursor-pointer outline-none border-[1px] border-gray-400 border-solid"
                onChange={(e) => {
                  setInfoCartProduct((prev) => ({
                    ...prev,
                    size: e.target.value,
                  }));
                  setShowNotification((prev) => ({ ...prev, size: false }));
                }}
                defaultValue="select"
                required
              >
                <option disabled value="select" className="hidden">
                  Select
                </option>
                <option className="p-2 bg-white cursor-pointer" value="small">
                  Small
                </option>
                <option className="p-2 bg-white cursor-pointer" value="medium">
                  Medium
                </option>
                <option className="p-2 bg-white cursor-pointer" value="large">
                  Large
                </option>
              </select>

              {showNotification?.size && (
                <div className="absolute top-1/2 translate-y-[-50%] left-[-130px] w-[110px]">
                  <div className="relative px-4 py-1 rounded-md text-white bg-[#DF3131] text-sm">
                    Select Size
                    <div className="absolute top-1/2 translate-y-[-50%] right-[-14px] height-[20px] w-[14px] border-l-[#DF3131] border-l-[7px] border-t-transparent border-t-[7px] border-r-transparent border-r-[7px] border-solid border-b-[7px] border-b-transparent"></div>
                  </div>
                </div>
              )}
            </div>

            <span className="mt-3 text-base font-light">Color{product?.color[0] === "default" && ": no color"}</span>

            <div className="relative flex gap-2">
              {product?.color?.map((colorItem, index) => {
                if (colorItem !== "default") {
                  return (
                    <Tippy
                      key={index}
                      placement="top"
                      arrow={true}
                      content={<span className="px-4 py-2">{colorItem}</span>}
                    >
                      <div
                        onClick={() => {
                          setImageShow(product?.image[index][colorItem]);
                          setInfoCartProduct((prev) => ({ ...prev, color: colorItem }));
                          setShowNotification((prev) => ({ ...prev, color: false }));
                        }}
                        className={`flexCenter w-[26px] h-[26px] ${
                          infoCartProduct?.color === colorItem && "border-gray-400 border-[1px] border-solid"
                        }`}
                      >
                        <div
                          className={`${
                            product?.color[0] !== "default" && "w-[20px] h-[20px]"
                          } rounded-full border-white border-solid border-[1px] hover:opacity-75 bg-${colorItem.toLowerCase()}`}
                        ></div>
                      </div>
                    </Tippy>
                  );
                }
              })}

              {product && product?.color.length > 1 && showNotification?.color && (
                <div className="absolute top-0 left-[-130px] w-[110px]">
                  <div className="relative px-4 py-1 rounded-md text-white bg-[#DF3131] text-sm">
                    Select Color
                    <div className="absolute top-1/2 translate-y-[-50%] right-[-14px] height-[20px] w-[14px] border-l-[#DF3131] border-l-[7px] border-t-transparent border-t-[7px] border-r-transparent border-r-[7px] border-solid border-b-[7px] border-b-transparent"></div>
                  </div>
                </div>
              )}
            </div>
            <span className="mt-3 text-base font-light">Quantity</span>

            <input
              className="w-[5.625rem] p-2 outline-none border-[1px] border-gray-400 border-solid"
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max="99999"
              step="1"
              defaultValue="1"
              onChange={(e) =>
                setInfoCartProduct((prev) => ({
                  ...prev,
                  quantity: Number(e.target.value),
                }))
              }
            />
            <div className="flex flex-col gap-3 w-full">
              <div className="flex gap-2 mt-8">
                <button
                  className="px-4 py-2 w-full text-white text-base bg-primary hover:opacity-70 transition duration-300 ease-linear"
                  onClick={handleAddProduct}
                >
                  Add to Card
                </button>

                {productLiked.some((p) => p._id === product?._id) ? (
                  <div
                    className="flexCenter lg:h-full w-[50px] text-primary text-xl bg-transparent border-primary border-[1px] border-solid cursor-pointer"
                    onClick={() => {
                      handleToggleLiked();
                    }}
                  >
                    <AiTwotoneHeart />
                  </div>
                ) : (
                  <div
                    className="flexCenter lg:h-full w-[50px] text-primary text-xl bg-transparent border-primary border-[1px] border-solid cursor-pointer"
                    onClick={() => {
                      handleToggleLiked();
                    }}
                  >
                    <AiOutlineHeart />
                  </div>
                )}
              </div>

              <button className="px-4 py-2 w-full text-white text-base bg-black hover:opacity-70 transition duration-200 ease-linear">
                Buy Now
              </button>

              <p className="lg:hidden sms:block text-left mt-8 pr-6 text-lg font-light">{product?.description}</p>
            </div>
            <div className="flex flex-col mt-10 text-base font-light">
              <div className="flex flex-col pb-4 border-b-[1px] border-gray-400 border-solid">
                <div className="flexBetween py-4">
                  <h2 className="text-lg font-light">Product Info</h2>

                  {showDetail.detail ? (
                    <div
                      className="h-full w-fit"
                      onClick={() =>
                        setShowDetail((prev) => ({
                          detail: false,
                          return: false,
                          shipping: false,
                        }))
                      }
                    >
                      <MinusIcon width={26} height={26} />
                    </div>
                  ) : (
                    <div
                      className="h-full w-fit"
                      onClick={() =>
                        setShowDetail((prev) => ({
                          detail: true,
                          return: false,
                          shipping: false,
                        }))
                      }
                    >
                      <PlusIcon width={26} height={26} />
                    </div>
                  )}
                </div>

                {showDetail.detail && <p className="text-base">{product?.detail}</p>}
              </div>

              <div className="flex flex-col pb-4 border-b-[1px] border-gray-400 border-solid">
                <div className="flexBetween py-4">
                  <h2 className="text-lg font-light">Return & Return Policy</h2>

                  {showDetail.return ? (
                    <div
                      className="h-full w-fit"
                      onClick={() =>
                        setShowDetail((prev) => ({
                          detail: false,
                          return: false,
                          shipping: false,
                        }))
                      }
                    >
                      <MinusIcon width={26} height={26} />
                    </div>
                  ) : (
                    <div
                      className="h-full w-fit"
                      onClick={() =>
                        setShowDetail((prev) => ({
                          detail: false,
                          return: true,
                          shipping: false,
                        }))
                      }
                    >
                      <PlusIcon width={26} height={26} />
                    </div>
                  )}
                </div>

                {showDetail.return && (
                  <p>
                    I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they
                    are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great
                    way to build trust and reassure your customers that they can buy with confidence.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <div className="flexBetween py-4">
                  <h2 className="text-lg font-light">Shipping Info</h2>

                  {showDetail.shipping ? (
                    <div
                      className="h-full w-fit"
                      onClick={() =>
                        setShowDetail((prev) => ({
                          detail: false,
                          return: false,
                          shipping: false,
                        }))
                      }
                    >
                      <MinusIcon width={26} height={26} />
                    </div>
                  ) : (
                    <div
                      className="h-full w-fit"
                      onClick={() =>
                        setShowDetail((prev) => ({
                          detail: false,
                          return: false,
                          shipping: true,
                        }))
                      }
                    >
                      <PlusIcon width={26} height={26} />
                    </div>
                  )}
                </div>

                {showDetail.shipping && (
                  <p>
                    I'm a shipping policy. I'm a great place to add more information about your shipping methods,
                    packaging and cost. Providing straightforward information about your shipping policy is a great way
                    to build trust and reassure your customers that they can buy from you with confidence.
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </motion.section>
  );
}

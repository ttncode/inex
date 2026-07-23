"use client";

import axios from "axios";
import Image from "next/image";
import getStripe from "lib/getStripe";
import CloseIcon from "public/icons/CloseIcon";
import LockIcon from "public/icons/LockIcon";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useCartState } from "context/CartStateContext";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export default function CartView() {
  const { cartProducts, totalPrice, totalQuantities, toggleCartProductQuantity, onRemove } = useCartState();

  useEffect(() => {
    console.log("re-render");
  }, [cartProducts, totalPrice, totalQuantities]);

  const handleCheckout = async () => {
    if (cartProducts.length < 1 || totalQuantities == 0 || totalPrice == 0) return;
    const stripe = await getStripe();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT!}/api/stripe/payment`, cartProducts);
      await stripe?.redirectToCheckout({ sessionId: response.data.id });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <motion.section
      className="flexCenter xl:mt-header-xl lg:mt-header-lg sms:mt-header-sm w-screen h-fit bg-[#e8e6e6]"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="gap-10 lg:w-2/3 sms:w-screen min-h-screen py-14 lg:px-0 sms:px-6 grid lg:grid-cols-3 grid-cols-1 text-paragraph text-sm">
        <div className="lg:col-span-2 flex-col">
          <h1 className="font-roboto lg:text-lg sms:text-xl font-semibold text-primary pb-4 w-full text-left border-b-[1px] border-solid border-gray-400">
            MY CART
          </h1>

          {cartProducts.length < 1 && <h1 className="text-2xl py-4">Cart is empty!</h1>}

          {cartProducts &&
            cartProducts?.map((product, index) => (
              <div key={index} className="flexBetween w-full h-fit py-8 border-b-[1px] border-solid border-gray-400">
                <div className="flex gap-5">
                  <Image
                    src={product?.image}
                    blurDataURL={product?.image}
                    className="border-[1px] border-solid border-gray-400 object-cover rounded-sm"
                    alt="clothes.png"
                    width={100}
                    height={100}
                  />

                  <div className="flex flex-col lg:text-sm sms:text-base lg:font-light sms:font-normal">
                    <span className="text-lg font-base mb-3">{product?.name}</span>
                    <span>{product?.price}</span>
                    <span>Size: {product?.size}</span>
                    <span>Color: {product?.color?.toLowerCase()}</span>
                    <div className="sms:flex lg:text-xs sms:text-base lg:hidden lg:mt-0 sms:mt-1">
                      <span
                        className="p-[4px] border-[1px] border-solid border-gray-400 cursor-pointer"
                        onClick={() => toggleCartProductQuantity(product._id, product.size, product.color, "desc")}
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className="py-[2px] px-[8px] border-[1px] border-solid border-gray-400 cursor-pointer">
                        {product?.quantity}
                      </span>
                      <span
                        className="p-[4px] border-[1px] border-solid border-gray-400 cursor-pointer"
                        onClick={() => toggleCartProductQuantity(product._id, product.size, product.color, "inc")}
                      >
                        <AiOutlinePlus />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flexCenter lg:flex-row sms:flex-col lg:mb-auto mb-0 lg:gap-10 sms:gap-[5rem] h-full">
                  <div className="lg:flex text-xs sms:hidden">
                    <span
                      className="p-[4px] border-[1px] border-solid border-gray-400 cursor-pointer"
                      onClick={() => toggleCartProductQuantity(product._id, product.size, product.color, "desc")}
                    >
                      <AiOutlineMinus />
                    </span>
                    <span className="py-[2px] px-[8px] border-[1px] border-solid border-gray-400 cursor-pointer">
                      {product?.quantity}
                    </span>
                    <span
                      className="p-[4px] border-[1px] border-solid border-gray-400 cursor-pointer"
                      onClick={() => toggleCartProductQuantity(product._id, product.size, product.color, "inc")}
                    >
                      <AiOutlinePlus />
                    </span>
                  </div>

                  <span className="text-lg">${Number(product?.price.slice(1, 3)) * Number(product?.quantity)}.00</span>

                  <div
                    className="p-3 hover:opacity-60 cursor-pointer"
                    onClick={() => onRemove(product, product?.size, product?.color)}
                  >
                    <CloseIcon />
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="lg:col-span-1 lg:flex sms:hidden flex-col text-paragraph text-sm">
          <h1 className="font-roboto text-lg font-semibold text-primary pb-4 w-full text-left border-b-[1px] border-solid border-gray-400">
            Order Summary
          </h1>
          <div className="flex flex-col lg:bg-transparent w-full">
            <div className="lg:block sms:hidden flex flex-col gap-3 py-5 px-2 text-base font-light border-b-[1px] border-solid border-gray-400">
              <div className="flexBetween">
                <span>Total Product</span>
                <span>{totalQuantities}</span>
              </div>
              <span className="underline">Estimate Delivery</span>
            </div>

            <div className="flexBetween py-5 text-xl font-base">
              <span>Total:</span>
              <span>${totalPrice}.00</span>
            </div>

            <button
              className="mt-4 mb-3 flexCenter w-full h-[42px] border-primary border-2 border-solid text-primary text-sm bg-white hover:text-white hover:bg-primary transition duration-300 ease-linear"
              onClick={handleCheckout}
            >
              Checkout
            </button>

            <div className="lg:flex sms:hidden items-center justify-center">
              <LockIcon width={11} height={14} />
              <span className="ml-2">Secure Checkout</span>
            </div>
          </div>
        </div>

        <div className="lg:hidden sms:block fixed bottom-0 left-0 p-4 bg-white w-screen">
          <div className="flexBetween lg:py-5 sms:py-2 text-xl font-base">
            <span>Total:</span>
            <span>${totalPrice}.00</span>
          </div>

          <button
            className="mt-4 mb-3 flexCenter w-full h-[42px] border-primary border-2 border-solid text-primary text-sm bg-white hover:text-white hover:bg-primary transition duration-300 ease-linear"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </motion.section>
  );
}

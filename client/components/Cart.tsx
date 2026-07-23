"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { BsChevronDoubleRight } from "react-icons/bs";
import { useCartState } from "../context/CartStateContext";
import { CartProduct } from "@/types";

export default function Cart() {
  const { showCart, setShowCart, cartProducts, onRemove, totalPrice, totalQuantities, toggleCartProductQuantity } =
    useCartState();

  return (
    <motion.section
      className="absolute top-0 right-0 flex flex-col h-screen lg:w-[350px] sms:w-screen text-white z-30"
      variants={{
        hidden: { opacity: 0, x: "100%" },
        show: { opacity: 1, x: "0" },
      }}
      transition={{ duration: 0.85 }}
      initial="hidden"
      animate={showCart ? "show" : "hidden"}
    >
      <header className="relative flexCenter p-10 w-full h-[100px] bg-primary">
        <BsChevronDoubleRight className="absolute left-8 text-2xl cursor-pointer" onClick={() => setShowCart(false)} />
        <h1 className="flexCenter gap-1 text-center text-2xl font-semibold">
          Cart
          <span className="text-lg">
            (<span className="text-base">{totalQuantities}</span>)
          </span>
        </h1>
      </header>

      <main className="flexBetween flex-col bg-black h-full text-white">
        <div className="w-full overflow-hidden overflow-y-scroll py-2">
          {cartProducts?.length < 1 && <h1 className="text-center mt-4 text-xl font-base">Cart is empty!</h1>}

          <div className="relative w-full flex-1 px-6">
            {cartProducts?.length > 0 &&
              cartProducts?.map((product: CartProduct, index) => (
                <div
                  key={product?._id + index}
                  className="w-full h-full py-4 border-b-[1px] border-solid border-gray-400"
                >
                  <div className="flexBetween gap-4 w-full h-full">
                    <Image
                      key={index}
                      src={product?.image}
                      blurDataURL={product?.image}
                      className="border-[1px] border-solid border-gray-400 object-cover rounded-sm"
                      alt="clothes.png"
                      width={85}
                      height={85}
                    />

                    <div className="flexBetween w-full h-[85px] p-1">
                      <div className="flex flex-col justify-between h-full text-sm font-medium">
                        <span>{product?.name}</span>
                        <span className="font-light">Size: {product?.size}</span>
                        <span className="font-light">Color: {product?.color?.toLowerCase()}</span>
                        <div className="flexStart text-xs">
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

                      <div className="flexBetween flex-col h-full mt-1">
                        <span className="text-sm">{product?.price}</span>
                        <button
                          type="button"
                          className="p-1 text-primary text-xl"
                          onClick={() => onRemove(product, product?.size, product?.color)}
                        >
                          <TiDeleteOutline />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="flexCenter flex-col gap-2 w-full z-10">
          <div className="flexBetween w-full px-10 font-medium">
            <span>Subtotal:</span>
            <span>${totalPrice}.00</span>
          </div>

          <Link
            href={"/cart"}
            onClick={() => setShowCart(false)}
            className="w-full px-10 py-6 border-t-[2px] border-solid border-gray-400"
          >
            <button className="w-full px-10 py-2 border-primary border-2 text-white text-sm bg-primary hover:text-primary hover:bg-paragraph hover:border-primary hover:border-2 transition duration-300 ease-linear">
              VIEW CART
            </button>
          </Link>
        </div>
      </main>
    </motion.section>
  );
}

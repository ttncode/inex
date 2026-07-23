"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CartProduct, CartStateContextValue, Product } from "@/types";
import { setProductLocalStorage } from "../lib/productLocalStorage";

const INITIAL_CART = {
  cartProducts: [],
};

if (typeof window !== "undefined") {
  // Check if running on the client side
  const storedCart = localStorage.getItem("cartProduct");
  INITIAL_CART.cartProducts = storedCart ? JSON.parse(storedCart) : [];
}

const CartStateContext = createContext<CartStateContextValue>({
  showCart: false,
  setShowCart: () => {},
  cartProducts: [],
  setCartProducts: () => {},
  totalPrice: 0,
  setTotalPrice: () => {},
  totalQuantities: 0,
  setTotalQuantities: () => {},
  onAdd: () => {},
  onRemove: () => {},
  toggleCartProductQuantity: () => {},
});

export const CartStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>(INITIAL_CART.cartProducts);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);

  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showCart]);

  useEffect(() => {
    let totalPriceLocal: number = 0;
    cartProducts.forEach((product: CartProduct) => {
      totalPriceLocal += Number(product.price.slice(1, 3)) * product.quantity;
    });
    setTotalQuantities(cartProducts.length);
    setTotalPrice(totalPriceLocal);
  }, [cartProducts]);

  const onAdd = (product: CartProduct) => {
    if (!product || product === null || product === undefined) return;
    // Check if the product is already in the cart
    const index = cartProducts.findIndex(
      (item: CartProduct) => item._id === product._id && item.color === product.color && item.size === product.size
    );

    if (index !== -1) {
      const updatedCartProducts = [...cartProducts];
      const existProduct = updatedCartProducts[index];

      // Check if the size or color is different
      if (existProduct.size !== product.size || existProduct.color !== product.color) {
        updatedCartProducts.push(product);
      } else {
        // If size and color match, update the quantity
        existProduct.quantity += product.quantity;
      }

      setCartProducts(updatedCartProducts);
      setProductLocalStorage(updatedCartProducts);
      setShowCart(true);
    } else {
      // If the product is not in the cart, add it
      const updatedCartProducts = [...cartProducts, product];

      setCartProducts(updatedCartProducts);
      setProductLocalStorage(updatedCartProducts);
      setShowCart(true);
    }
  };

  const onRemove = (product: CartProduct, size: string, color: string) => {
    const indexToRemove = cartProducts.findIndex(
      (item: CartProduct) => item._id === product._id && item.size === size && item.color === color
    );

    if (indexToRemove !== -1) {
      // If a matching product is found, remove it
      const updatedCartProducts = [...cartProducts];
      updatedCartProducts.splice(indexToRemove, 1);

      setCartProducts(updatedCartProducts);
      setProductLocalStorage(updatedCartProducts);
    }
  };

  const toggleCartProductQuantity = (id: string, size: string, color: string, type: string) => {
    if (id == null) return;
    // Check if the product is already in the cart
    const index = cartProducts.findIndex(
      (item: CartProduct) =>
        item._id === id &&
        item.color.toLocaleLowerCase() === color.toLocaleLowerCase() &&
        item.size.toLocaleLowerCase() === size.toLocaleLowerCase()
    );

    if (index === -1) return;
    const updatedCartProducts = [...cartProducts];
    const existProduct = updatedCartProducts[index];
    if (type === "inc") {
      console.log("inc");
      existProduct.quantity++;
      setCartProducts(updatedCartProducts);
      setProductLocalStorage(updatedCartProducts);
    }
    if (type === "desc") {
      if (existProduct.quantity > 1) {
        console.log("desc");
        existProduct.quantity--;
        setCartProducts(updatedCartProducts);
        setProductLocalStorage(updatedCartProducts);
      }
      return;
    }
  };

  const contextData = {
    showCart,
    setShowCart,
    cartProducts,
    setCartProducts,
    totalPrice,
    setTotalPrice,
    totalQuantities,
    setTotalQuantities,
    onAdd,
    toggleCartProductQuantity,
    onRemove,
  };

  return <CartStateContext.Provider value={contextData}>{children}</CartStateContext.Provider>;
};

export const useCartState = () => useContext(CartStateContext);
export default CartStateProvider;

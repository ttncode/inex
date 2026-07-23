import { CartProduct } from "@/types";

export const getProductLocalStorage = (): any => {
  const productLocal: any = localStorage.getItem("cartProduct");
  if (productLocal) {
    const products = JSON.parse(productLocal);
    return products;
  }
  return [];
};

export const setProductLocalStorage = (products: CartProduct[]) => {
  localStorage.setItem("cartProduct", JSON.stringify(products));
};

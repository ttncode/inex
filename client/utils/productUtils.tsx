import { Product, RangePrice } from "@/types";

export const sortByType = (type: string, products: Product[]): Product[] => {
  switch (type) {
    case "default":
      return products;
    case "priceInc":
      return products.slice().sort((a, b) => Number(a.price.slice(1, 3)) - Number(b.price.slice(1, 3)));
    case "priceDesc":
      return products.slice().sort((a, b) => Number(b.price.slice(1, 3)) - Number(a.price.slice(1, 3)));
    case "nameInc":
      return products.slice().sort((a, b) => a.name.localeCompare(b.name));
    case "nameDesc":
      return products.slice().sort((a, b) => b.name.localeCompare(a.name));
    default:
      return [];
  }
};

export const filterByType = (type: string, products: Product[]): Product[] | [] => {
  let productList;
  switch (type) {
    case "all":
      return products;
    case "liked":
      const productLikedLS = localStorage.getItem("productLiked");
      productList = productLikedLS && JSON.parse(productLikedLS);
      return productList;
    case "bestSeller":
      productList = products.filter((product) => product.bestSeller === true);
      return productList;
    case "newArrival":
      productList = products.filter((product) => product.newArrival === true);
      return productList;
    case type:
      productList = products.filter((product) => product.type === type);
      return productList;
    default:
      return [];
  }
};

export const filterByColor = (color: string[], products: Product[]): Product[] | [] => {
  if (color === null || color.length < 1) return [];
  const productList = products.filter((product) => {
    return product.color.some((item) => color.includes(item));
  });
  if (productList) return productList;
  return [];
};

export const filterByRangePrice = (rangePrice: RangePrice, products: Product[]): Product[] | [] => {
  const productList: Product[] = products.filter((product) => {
    return (
      Number(product.price.slice(1)) >= Number(rangePrice.min) &&
      Number(product.price.slice(1)) <= Number(rangePrice.max)
    );
  });
  if (productList) return productList;
  return [];
};

export const filterProduct = (
  newArrival: boolean,
  type: string,
  rangePrice: RangePrice,
  color: string[],
  sortBy: string,
  products: Product[]
): Product[] | [] => {
  let productList;
  if (products.length < 1) return [];

  if (newArrival) {
    productList = products.filter((product) => product.newArrival === true);
    return productList;
  }
  if (type && rangePrice.max !== 0 && color.length > 0) {
    // type, price, color
    const typeProduct = filterByType(type, products);
    const rangePriceProduct = filterByRangePrice(rangePrice, typeProduct);
    const colorProduct = filterByColor(color, rangePriceProduct);
    const sortByProduct = sortByType(sortBy, colorProduct);
    productList = sortByProduct;
    return productList;
  } else if (type && rangePrice.max !== 0) {
    // type, price
    const typeProduct = filterByType(type, products);
    const rangePriceProduct = filterByRangePrice(rangePrice, typeProduct);
    const sortByProduct = sortByType(sortBy, rangePriceProduct);
    productList = sortByProduct;
    return productList;
  } else if (type && color.length > 0) {
    // type, color
    const typeProduct = filterByType(type, products);
    const colorProduct = filterByColor(color, typeProduct);
    const sortByProduct = sortByType(sortBy, colorProduct);
    productList = sortByProduct;
    return productList;
  } else if (type) {
    // type
    const typeProduct = filterByType(type, products);
    const sortByProduct = sortByType(sortBy, typeProduct);
    productList = sortByProduct;
    return productList;
  } else if (rangePrice.max !== 0) {
    // price, type = all
    const rangePriceProduct = filterByRangePrice(rangePrice, products);
    const sortByProduct = sortByType(sortBy, rangePriceProduct);
    productList = sortByProduct;
    return productList;
  } else if (color.length > 0) {
    // color, type = all
    const colorProduct = filterByColor(color, products);
    const sortByProduct = sortByType(sortBy, colorProduct);
    productList = sortByProduct;
    return productList;
  } else {
    // nothing
    productList = products;
    return productList;
  }
};

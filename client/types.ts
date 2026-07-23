export type User = {
  _id: string;
  username: string;
  avatar: string;
  email: string;
  purchasedProducts?: Product[];
  role: [];
};

export type UserGoogle = {
  username: string;
  email: string;
  avatar: string;
};

export type Message = {
  _id: string;
  content: string;
  sender: string;
  receiver: string[];
  sendAt: string;
  roomId: string;
};

export type messageData = {
  content: string;
  sendAt: string;
};

export type Chatroom = {
  _id: string;
  name: string;
  members: string[];
  createdBy: string;
};

export type Product = {
  _id: string;
  name: string;
  type: string;
  image: Record<string, string>[];
  price: string;
  size: string[];
  color: string[];
  storeCode: string;
  quantity: number;
  description: string;
  detail: string;
  bestSeller: boolean;
  newArrival: boolean;
};

export type CartProduct = {
  _id: string;
  name: string;
  type: string;
  image: string;
  price: string;
  size: string;
  color: string;
  storeCode: string;
  quantity: number;
  description: string;
  detail: string;
  bestSeller: boolean;
  newArrival: boolean;
};

export type InfoCartProduct = {
  size: string;
  color: string;
  quantity: number;
};

export type RangePrice = {
  min: number;
  max: number;
};

export type ProductFilterContextValue = {
  rangePrice: RangePrice;
  setRangePriceEvent: (data: RangePrice) => void;
  type: string;
  setTypeEvent: (data: string) => void;
  color: string[];
  setColorEvent: (data: string) => void;
  sortBy: string;
  setSortByEvent: (data: string) => void;
  showFilter: boolean;
  setShowFilter: (data: boolean) => void;
};

export type CartStateContextValue = {
  showCart: boolean;
  setShowCart: (data: boolean) => void;
  cartProducts: CartProduct[] | [];
  setCartProducts: (data: CartProduct[]) => void;
  totalPrice: number;
  setTotalPrice: (data: number) => void;
  totalQuantities: number;
  setTotalQuantities: (data: number) => void;
  onAdd: (data: CartProduct) => void;
  onRemove: (data: CartProduct, size: string, color: string) => void;
  toggleCartProductQuantity: (id: string, type: string, size: string, color: string) => void;
};

export type AuthState = {
  user: User | null;
  isFetching: boolean;
  error: boolean;
  isVerify: boolean;
};

export type FetchState = {
  data: any | null;
  isFetching: boolean;
  error: boolean;
};

export type AuthStateContextValue = {
  user: User | null;
  isFetching: boolean;
  error: boolean;
  isVerify: boolean;
  dispatch: (data: any) => void;
};

export type FetchStateContext = {
  data: any;
  isFetching: boolean;
  error: boolean;
  dispatch: (data: any) => void;
};

export type UserSignUp = {
  username: string;
  email: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

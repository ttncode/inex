import { loadStripe } from "@stripe/stripe-js";

const getStripe = () => {
  let stripePromise;
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default getStripe;

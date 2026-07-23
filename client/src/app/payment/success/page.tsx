"use client";

import "styles/SuccessPage.css";
import { useEffect, useState } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useCartState } from "context/CartStateContext";
import { motion } from "framer-motion";
import Link from "next/link";
import runFireworks from "lib/getConfettiEffect";

export default function SuccessPage() {
  const { setCartProducts } = useCartState();
  const [showAnimation, setShowAnimation] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(false);
    }, 8000);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartProduct", "");
    setCartProducts([]);
    runFireworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.section
      className="h-screen w-screen bg-white pt-1"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="success-wrapper">
        <div className="success">
          {showAnimation ? (
            <button className="order animate">
              <span className="default">Complete Order</span>
              <span className="success">
                Order Placed
                <svg viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg>
              </span>
              <div className="box"></div>
              <div className="truck">
                <div className="back"></div>
                <div className="front">
                  <div className="window"></div>
                </div>
                <div className="light top"></div>
                <div className="light bottom"></div>
              </div>
              <div className="lines"></div>
            </button>
          ) : (
            <div className="icon">
              <BsBagCheckFill />
            </div>
          )}

          <h2 className="pt-6">Thank you for your order!</h2>
          <p className="email-msg">Check your email inbox for the receipt.</p>
          <p className="description">
            If you have any questions, please email
            <a className="email" href="mailto:order@example.com">
              Admin@gmail.com
            </a>
          </p>
          <Link href="/shop">
            <button type="button" className="btnContinue">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

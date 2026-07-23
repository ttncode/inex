"use client";

import "styles/Form.css";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import PasswordIcon from "public/icons/PasswordIcon";
import AppleIcon from "public/icons/AppleIcon";
import GoogleIcon from "public/icons/GoogleIcon";
import EmailIcon from "public/icons/EmailIcon";
import { useState, useEffect } from "react";
import { UserSignUp } from "@/types";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { fetchFailure, fetchStart } from "context/FetchAction";
import { useFetch } from "context/FetchContext";

export default function SignUp() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: session } = useSession();
  const { isFetching, dispatch } = useFetch();
  const [userInfo, setUserInfo] = useState<UserSignUp>({
    username: "",
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState({
    email: true,
    password: true,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  axios.defaults.withCredentials = true;

  const handleSignUp = async () => {
    dispatch(fetchStart());
    try {
      if (!isValid.email || userInfo.email.length < 0 || !isValid.password || userInfo.password.length < 0) return;
      await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT!}/api/mail/register`, userInfo);
      router.push("/verify-email");
    } catch (error: any) {
      console.error(error);
      toast.error("Sent mail is fail!", { theme: "dark" });
    } finally {
      dispatch(fetchFailure());
    }
  };

  const signUpWithGoogle = async () => {
    try {
      signIn("google", { callbackUrl: process.env.NEXT_PUBLIC_BASE_URL });
    } catch (error: any) {
      console.error("Error initiating Google login:", error);
    }
  };

  useEffect(() => {
    if (user || session) router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userInfo.email.length > 0) {
      const checkEmailValid = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const checkValid = regex.test(userInfo.email.toLowerCase());
        if (checkValid) {
          setIsValid((prev) => ({ ...prev, email: true }));
        } else {
          setIsValid((prev) => ({ ...prev, email: false }));
        }
      };
      checkEmailValid();
    }
  }, [userInfo.email]);

  useEffect(() => {
    if (userInfo.password.length > 0) {
      const checkPasswordValid = () => {
        if (userInfo.password.length > 4) {
          setIsValid((prev) => ({ ...prev, password: true }));
        } else {
          setIsValid((prev) => ({ ...prev, password: false }));
        }
      };
      checkPasswordValid();
    }
  }, [userInfo.password]);

  return (
    <motion.section
      className="flexCenter w-screen xl:mt-header-xl lg:mt-header-lg sms:mt-header-sm bg-[#e8e6e6] sms:h-[90vh] lg:h-[100vh]"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid lg:grid-cols-2 sms:grid-cols-1 lg:w-3/5 h-full sms:w-full">
        <div className="lg:col-span-1 lg:block sms:hidden w-full h-full">
          <Image
            src="https://static.wixstatic.com/media/ea26fd_f31158283e3c4d81af74bbbac4309ab0~mv2_d_1920_3354_s_2.jpg/v1/fill/w_479,h_642,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/ea26fd_f31158283e3c4d81af74bbbac4309ab0~mv2_d_1920_3354_s_2.jpg"
            blurDataURL="/images/image1-about.webp"
            alt="clothes.pnj"
            className="w-full h-full object-cover"
            loading="lazy"
            width={400}
            height={400}
          />
        </div>

        <main className="lg:col-span-1 sms:grid-cols-2 w-full h-full bg-paragraph text-white">
          <form className="form_main w-full h-full">
            <p className="heading lg:pt-0 sms:pt-6">Sign Up</p>
            <div className="inputContainer">
              <EmailIcon fill="black" />
              <input
                id="username"
                type="text"
                value={userInfo.username}
                className="inputField"
                onChange={(e) => setUserInfo((prev) => ({ ...prev, username: e.target.value }))}
                placeholder="User Name"
                required
              />
            </div>

            <div className="inputContainer">
              <EmailIcon fill="black" />
              <input
                type="text"
                value={userInfo.email}
                id="email"
                className="inputField"
                onChange={(e) => setUserInfo((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Email"
                required
              />
            </div>

            {!isValid.email && <p className="message_email">Please enter a valid email address.</p>}

            <div className="inputContainer">
              <PasswordIcon fill="black" />
              <input
                type={`${!showPassword ? "password" : "text"}`}
                className="inputField pr-9"
                id="password"
                placeholder="Password"
                onChange={(e) => setUserInfo((prev) => ({ ...prev, password: e.target.value }))}
                required
              />
              <div
                className="absolute right-0 top-0 flexCenter pr-3 h-full w-40px cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {!showPassword ? (
                  <BsFillEyeSlashFill className="fill-black" />
                ) : (
                  <BsFillEyeFill className="fill-black" />
                )}
              </div>
            </div>
            {!isValid.password && (
              <p className="message_password">Your password must contain between 4 and 60 characters.</p>
            )}

            <button
              onClick={handleSignUp}
              id="buttonSubmit"
              className={`${isFetching && "loading"}`}
              disabled={isFetching}
            >
              {isFetching ? (
                <div className="line-wobble"></div>
              ) : (
                <span className="flexCenter w-full h-full">Submit</span>
              )}
            </button>

            <div className="flexCenter">
              <Link href="/reset-password" className="forgotLink">
                Forgot your password?
              </Link>
              <Link href="/login" className="signUpLink">
                Log in
              </Link>
            </div>

            <div className="buttons-container">
              <div onClick={signUpWithGoogle} className="google-login-button">
                <GoogleIcon width={20} height={20} />
                <span>Sign up with Google</span>
              </div>
              <div className="apple-login-button">
                <AppleIcon width={20} height={20} />
                <span>Sign up with Apple</span>
              </div>
            </div>
          </form>
        </main>
      </div>
    </motion.section>
  );
}

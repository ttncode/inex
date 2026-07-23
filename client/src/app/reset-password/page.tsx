/* eslint-disable react/no-unescaped-entities */
"use client";

import "styles/Loading.css";
import axios from "axios";
import { fetchFailure, fetchStart } from "context/FetchAction";
import { useFetch } from "context/FetchContext";
import { useState } from "react";

export default function ForgotPassword() {
  const { isFetching, dispatch } = useFetch();
  const [email, setEmail] = useState<string>("");
  const [isSendMail, setIsSendMail] = useState<boolean>(false);

  const handleSendMail = async () => {
    dispatch(fetchStart());
    const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT!}/api/mail/reset-password/${email}`);
    if (res.status === 200) setIsSendMail(true);
    dispatch(fetchFailure());
  };

  return (
    <section className="h-screen w-screen bg-[#e8e6e6]">
      <main className="flexCenter w-full h-full">
        <div className="relative flexCenter flex-col lg:w-1/2 md:w-2/3 sms:w-full h-fit py-20 shadow-lg bg-white m-10">
          <div className="absolute top-0 left-0 flexCenter w-full h-12 bg-paragraph">
            <h1 className="text-white font-bold text-xl">Forgot Password</h1>
          </div>
          <div className="flexCenter flex-col gap-6 w-2/3">
            <div className="flexCenter w-full border-4px text-paragraph">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-full text-base text-paragraph px-3 py-2 bg-transparent outline-none border-solid border-paragraph border-[2px] placeholder:font-light"
                placeholder="Enter your email..."
                required
              />
            </div>
            {!isSendMail ? (
              <button
                className={`flexCenter w-1/2 text-base bg-paragraph text-white hover:opacity-80 cursor-pointer ${
                  isFetching && "loading"
                }`}
                disabled={isFetching}
                onClick={handleSendMail}
              >
                <span className="py-2 px-2">Verify with Email</span>
              </button>
            ) : (
              <span className="max-w-4/5 text-lg text-paragraph text-center">
                We've received a request to reset your password for your <span className="font-medium">{email}</span>{" "}
                account. To reset your password, please log in and confirm registration at your email.
              </span>
            )}
          </div>
        </div>
      </main>
    </section>
  );
}

/* eslint-disable react/no-unescaped-entities */
"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { TfiEmail } from "react-icons/tfi";
import { toast } from "react-toastify";

export default function VerifyEmailToken() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!params.token) return;
    (async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT!}/api/mail/verify/${params.token}`);
      router.push("/login");
      toast.success(res.data.message, { theme: "dark" });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="h-screen w-screen bg-[#e8e6e6]">
      <main className="flexCenter w-full h-full">
        <div className="relative flexCenter flex-col lg:w-1/2 md:w-2/3 sms:w-full h-fit py-20 shadow-lg bg-white m-10">
          <div className="absolute top-0 left-0 flexCenter w-full h-12 bg-paragraph">
            <h1 className="text-white font-bold text-xl">Verifying your email</h1>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flexCenter border-4px text-paragraph">
              <div className="flexCenter h-fit w-fit p-4 border-[4px] border-solid border-paragraph rounded-full">
                <TfiEmail className="text-4xl" />
              </div>
            </div>
            <span className="max-w-[350px] text-lg text-paragraph text-center">We're authenticating your identity</span>
          </div>
        </div>
      </main>
    </section>
  );
}

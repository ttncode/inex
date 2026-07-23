"use client";

import "styles/Loading.css";
import axios from "axios";
import { fetchFailure, fetchStart, fetchSuccess } from "context/FetchAction";
import { useFetch } from "context/FetchContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const params = useParams();
  const router = useRouter();
  const { isFetching, dispatch } = useFetch();
  const [newPassword, setNewPassword] = useState<string>("");
  const [isPassValid, setIsPassValid] = useState(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleResetPassword = async () => {
    dispatch(fetchStart());
    const resetPassword = async () => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT!}/api/mail/reset-password`, {
        token: params.token,
        newPassword,
      });
      if (res.status == 200) {
        router.push("/login");
        toast.success("Reset password success", { theme: "dark" });
      }
      dispatch(fetchFailure());
    };
    resetPassword();
  };

  useEffect(() => {
    if (newPassword.length < 1) return;
    if (newPassword.length > 4) {
      setIsPassValid(true);
    } else {
      setIsPassValid(false);
    }
  }, [newPassword]);

  return (
    <section className="h-screen w-screen bg-[#e8e6e6]">
      <main className="flexCenter w-full h-full">
        <div className="relative flexCenter flex-col lg:w-1/2 md:w-2/3 sms:w-full h-fit py-20 shadow-lg bg-white m-10">
          <div className="absolute top-0 left-0 flexCenter w-full h-12 bg-paragraph">
            <h1 className="text-white font-bold text-xl">Forgot Password</h1>
          </div>
          <div className="flexCenter flex-col gap-6 w-2/3">
            <div className="relative flexCenter w-full border-4px text-paragraph">
              <input
                id="password"
                type={`${!showPassword ? "password" : "text"}`}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-full text-base text-paragraph px-4 py-2 bg-transparent outline-none border-solid border-paragraph border-[2px] placeholder:font-light"
                placeholder="Enter new password..."
                required
              />
              <div
                className="absolute right-0 top-0 flexCenter pr-4 h-full w-40px cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {!showPassword ? (
                  <BsFillEyeSlashFill className="fill-black" />
                ) : (
                  <BsFillEyeFill className="fill-black" />
                )}
              </div>
            </div>
            <div className="relative flexCenter flex-col gap-2 w-full border-4px text-paragraph">
              <input
                id="passwordCheck"
                type={`${!showPassword ? "password" : "text"}`}
                onChange={(e) => {
                  if (e.target.value !== newPassword) {
                    setIsPassValid(false);
                  } else {
                    document.getElementById("passwordCheck")?.focus();
                    setIsPassValid(true);
                  }
                }}
                className="w-full h-full text-base text-paragraph px-4 py-2 bg-transparent outline-none border-solid border-paragraph border-[2px] placeholder:font-light"
                placeholder="Enter password again..."
                required
              />
              {!isPassValid && (
                <span className="absolute bottom-[-30px] left-0  w-full text-primary">Password do not match</span>
              )}
            </div>
            <button
              className={`flexCenter w-1/2 mt-5 text-base bg-paragraph text-white cursor-pointer ${
                !isPassValid && "opacity-50 cursor-default"
              } ${isFetching && "loading"}`}
              onClick={handleResetPassword}
              disabled={!isPassValid || isFetching}
            >
              <span className="py-2 px-2">Reset Password</span>
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}

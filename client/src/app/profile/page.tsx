"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import { useAuth } from "context/AuthContext";
import { loginFailure } from "context/AuthAction";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Profile() {
  const router = useRouter();
  const { user, dispatch } = useAuth();
  const { data: session } = useSession();

  useEffect(() => {
    if (!user && !session) router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    dispatch(loginFailure());
    Cookies.set("accessToken", "");
    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/login` });
  };

  return (
    <motion.section
      className="relative xl:mt-header-xl lg:mt-header-lg sms:mt-header-sm w-full h-screen"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lg:w-1/2 sms:w-full h-full mx-auto text-white bg-white">
        <h1 className="mb-5 text-2xl font-normal border-b-[1px] border-solid border-[#282c2d]">Edit Profile</h1>
        <div className="profile flex flex-col gap-12 px-12 pt-10">
          <div className="flex items-center justify-center h-full w-full">
            <div className="flexCenter w-[150px] h-[150px] mt-3 text-3xl text-white bg-paragraph sms:rounded-full">
              {user?.avatar ? (
                <Image
                  src={user?.avatar}
                  blurDataURL={user?.avatar}
                  alt="Avatar.png"
                  width={25}
                  height={25}
                  style={{ borderRadius: "100%", objectFit: "cover", width: "100%", height: "100%" }}
                />
              ) : (
                user?.email?.charAt(0).toUpperCase()
              )}
            </div>
          </div>

          <div className="pb-8 flex-1 text-black">
            <div className="flexBetween">
              <h2 className="p-2">Username:</h2>
              <h2 className="p-2">{user?.username}</h2>
            </div>
            <div className="flexBetween">
              <h2 className="p-2">Email:</h2>
              <h2 className="p-2">{user?.email}</h2>
            </div>
            <div className="flexBetween">
              <h2 className="p-2">Role:</h2>
              <h2 className="p-2">{user?.role || "User"}</h2>
            </div>
            <div className="profileScreen__plans">
              <button
                onClick={handleLogout}
                className="w-full mt-8 py-3 border-primary border-2 text-white text-sm bg-primary hover:text-primary hover:bg-paragraph hover:border-primary hover:border-2 transition duration-300 ease-linear"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

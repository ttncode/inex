/* eslint-disable react/no-unescaped-entities */
"use client";

import axios from "axios";
import Link from "next/link";
import Pusher from "pusher-js";
import getFormattedTimestamp from "lib/getFormattedTimestamp";
import SmileIcon from "public/icons/SmileIcon";
import PaperclipIcon from "public/icons/PaperclipIcon";
import LogoIcon from "public/icons/LogoIcon";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FiSend } from "react-icons/fi";
import { Chatroom, Message } from "@/types";
import { VscChromeClose } from "react-icons/vsc";
import { useCartState } from "context/CartStateContext";

export default function ChatBox() {
  const { user } = useAuth();
  const { showCart } = useCartState();
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [chatroomList, setChatroomList] = useState<Chatroom[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [showChat, setShowChat] = useState<boolean>(false);
  const [showChatBox, setShowChatBox] = useState<boolean>(false);

  console.log(chatroomList);
  console.log(messageList);

  const transitionNavBar = () => {
    if (window.scrollY > 600) {
      setShowChat(true);
    } else {
      setShowChat(false);
    }
  };

  const handleSentMessage = async () => {
    if (!user || !user.email || newMessage.trim() === "") return;
    await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/pusher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newMessage,
        sender: user.email,
        sendAt: getFormattedTimestamp(),
      }),
    });
    setNewMessage("");
    document.getElementById("send")?.focus();
  };

  const fetchMessages = async () => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/message/to-shop`, {
      sender: user?.email,
      receiver: "manager@gmail.com",
    });
    setMessageList(res.data.messageList);
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, [showChat]);

  useEffect(() => {
    if (showCart) setShowChat(false);
  }, [showCart]);

  useEffect(() => {
    if (!user) return;
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    var channel = pusher.subscribe("chat-box");
    channel.bind("chat", function (data: any) {
      setMessageList((prev) => [...prev, data]);
      // Save Database
      const messageDto = {
        content: data.content,
        sendAt: data.sendAt,
        sender: user.email,
        receiver: "manager@gmail.com",
      };
      axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/message`, messageDto);
    });

    return () => {
      pusher.unsubscribe("chat-box");
    };
  }, [user]);

  return (
    <section className="fixed bottom-0 lg:right-4 sms:right-0 z-50 duration-400 ease-out">
      {!showChatBox ? (
        showChat && (
          <motion.div
            className="flexCenter w-[200px] h-[56px] bg-paragraph cursor-pointer display-slow"
            onClick={() => setShowChatBox(true)}
            variants={{
              hidden: { opacity: 0, y: "100%" },
              show: { opacity: 1, y: "0" },
            }}
            transition={{ duration: 0.85 }}
            initial="hidden"
            animate={showChat ? "show" : "hidden"}
          >
            <div className="flex justify-center items-center h-full text-xl gap-3 font-bold text-white tracking-widest cursor-pointer">
              <div className="p-1 border-solid border-2 border-white opacity-80">
                <LogoIcon width={10} height={10} fill="white" />
              </div>
              <h1 className="uppercase text-white text-base font-semibold tracking-[0px] opacity-90">CHAT WITH US!</h1>
            </div>
          </motion.div>
        )
      ) : (
        <motion.section
          className="flex flex-col lg:w-[22rem] lg:h-[31.25rem] sms:w-screen sms:h-screen bg-paragraph text-white display-slow"
          variants={{
            hidden: { opacity: 0, y: "100%" },
            show: { opacity: 1, y: "0" },
          }}
          transition={{ duration: 0.85 }}
          initial="hidden"
          animate={showChatBox ? "show" : "hidden"}
        >
          <header className="flexBetween h-[80px] w-full p-4 text-xl font-bold text-white">
            <div className="flexCenter gap-5">
              <div className="relative h-fit w-fit p-1 border-solid border-2 border-white opacity-80">
                <LogoIcon width={20} height={20} fill="white" />
                <div className="absolute bottom-[-8px] right-[-10px] w-[12px] h-[12px] bg-[#43b72a] rounded-full border-solid border-[2px] border-black"></div>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <h1 className="uppercase text-white text-base font-semibold tracking-[0px] opacity-90">
                  CHAT WITH US!
                </h1>
                <span className="text-sm font-normal opacity-80 leading-[1.4]">We'll reply as soon as we can</span>
              </div>
            </div>

            <div className="p-3 hover:opacity-60 cursor-pointer" onClick={() => setShowChatBox(false)}>
              <VscChromeClose />
            </div>
          </header>

          {user ? (
            <main className="flex flex-col gap-6 px-4 pb-4 pt-6 h-full w-full flex-1 bg-[#e8e8e8] text-paragraph overflow-y-scroll">
              {messageList &&
                messageList?.map((message, index) => (
                  <div key={index} className="w-full h-fit">
                    <div
                      className={`${
                        String(message?.sender) === String(user?.email)
                          ? "float-right bg-[#bbb] relative"
                          : "float-left bg-white"
                      } p-2 w-fit`}
                    >
                      <span className="absolute right-0 top-[-16px] inline-block text-xs">
                        {message?.sendAt?.split(",")[0]}
                      </span>
                      <span className="p-2 text-sm">{message?.content}</span>
                    </div>
                  </div>
                ))}
            </main>
          ) : (
            <div className="flex flex-col text-paragraph text-xl p-10 w-full h-full flex-1 bg-[#e8e8e8]">
              <span className="w-fit h-fit">You need to log in to be able to chat with us.</span>
              <span>
                Click{" "}
                <Link
                  href="/login"
                  className="text-blue underline cursor-pointer"
                  onClick={() => setShowChatBox(false)}
                >
                  here
                </Link>{" "}
                to login!
              </span>
            </div>
          )}

          <footer className="flexBetween w-full py-5 px-6 bg-white text-base font-light text-paragraph">
            <input
              id="send"
              className="flex-1 pr-2 outline-none bg-transparent placeholder:text-text"
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyUp={(e) => {
                if (String(e.key) === "Enter") {
                  handleSentMessage();
                }
              }}
            />
            <div className="flex gap-4 cursor-pointer">
              <SmileIcon />
              <PaperclipIcon />
              <FiSend onClick={handleSentMessage} className="opacity-70 lg:text-base sms:text-2xl hover:opacity-100" />
            </div>
          </footer>
        </motion.section>
      )}
    </section>
  );
}

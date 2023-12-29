"use client";

import supabase from "@/utils/service/supabaseClient";
import React, { FormEvent, useEffect } from "react";
import { useState } from "react";
import Image from "next/image";

import { signupFn } from "@/utils/service/api-call";
import RoundLoader from "@/components/atoms/RoundLoader";
import { useRouter } from "next/navigation";




import { useAppContext } from "../Context/AppContext";

import HomeNav from "@/components/organisms/HomeNav";


export default function Verification() {
 

  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [userData, setUserData] = useState<Partial<User>>();
  const [currentGame] = useState<string>(() => {
    if (typeof localStorage !== "undefined") {
      return JSON.parse(localStorage.getItem("currentGameSession")!) || "";
    } else return null;
  });

  const [isLoading, setIsLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading((prev) => !prev);

    if (name) {
      const data = { username: name };
      console.log("data", data);
      const user = await signupFn(data);
      if (user) {
        console.log(user);
        setUserData(user);

        localStorage.setItem("home_player", JSON.stringify(user));
        if (currentGame) {
          router.push(`/dashboard/${currentGame}`);
        }
        router.push("/dashboard");
      }
    }
  };

  const handleKeyDown = async (event: any) => {
    if (event.key === "Enter") {
      await submit(event);
    }
  };

  return (
    <main className="flex min-h-screen relative">
      <HomeNav hidden={false} />

      <div className="flex items-center mobile:max-sm:flex-col mobile:max-sm:justify-center mobile:max-sm:text-center mobile:max-sm:w-[95vw] px-24  w-full h-[80vh] justify-between mobile:max-sm:mt-10  mt-[10vh] m-auto">
        <div className="">
          <p className="text-gray-500"></p>
          <h2 className="text-[40px] font-bold text-themecolor bigScreen:text-[60px]  mobile:max-sm:w-full ">
            Welcome To PockerPlay
          </h2>
          <p className="text-gray-500">Excited to have fun?</p>
          <form
            className="border border-themecolor mobile:max-sm:border-none flex justify-between mobile:max-sm:flex-col mobile:max-sm:gap-2"
            onSubmit={submit}
          >
            <input
              className="w-full px-2 outline-none mobile:max-sm:mt-5 mobile:max-sm:border mobile:max-sm:border-themecolor mobile:max-sm:py-2"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button
              className="bg-themecolor bigScreen:text-[40px] text-white py-2 px-8 mobile:max-sm:w-full"
              // onClick={() => {
              //   setIsLoading((prev) => !prev);
              //   if (userData) router.push("/dashboard");
              // }}
              onKeyDown={handleKeyDown}
            >
              Continue
            </button>
          </form>
        </div>
        <div className="mobile:max-sm:hidden">
          <Image
            src={"/cardpic.png"}
            alt="cards image"
            width={500}
            height={500}
            className="bigScreen:hidden"
          />

          <Image
            src={"/cardpic.png"}
            alt="cards image"
            width={700}
            height={700}
            className="hidden bigScreen:block"
          />
        </div>
      </div>
      {isLoading && (
        <div className="w-full h-full absolute flex items-center justify-center">
          <RoundLoader />
        </div>
      )}
    </main>
  );
}

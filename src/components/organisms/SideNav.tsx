"use client";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import Overlay from "../atoms/Overlay";
import Popups from "../atoms/Popups";
import Link from "next/link";
import CreateGame from "./CreateGame";
import { toast } from "react-toastify";
import { socket } from "@/utils/service/constant";
import { string } from "prop-types";
import Image from "next/image";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/Context/AppContext";
import { MdGames } from "react-icons/md";

export default function SideNav() {
  const router = useRouter();
  const { currentGame } = useAppContext();
  const [openLogout, setOpenLogout] = useState(false);
  const [startNewGame, setStartNewGame] = useState(false);
  if (typeof localStorage === "undefined") return;
  const myDms = JSON.parse(localStorage.getItem("myDM")!) || [];

  return (
    <div className="flex flex-col justify-between bg-themecolor w-[240px] h-[100vh] items-center py-2">
      <div className="flex flex-col w-full gap-30">
        <div className="text-white flex justify-center items-center font-bold mb-[40px]">
          <Link href={"/"}>
            <Image
              src={"/POCKERPLAY-LOGO-white.png"}
              alt=""
              width={200}
              height={100}
            />
          </Link>
        </div>
        <div>
          <div className="flex flex-col w-full items-center">
            <button
              onClick={() => {
                router.push("/dashboard");
              }}
              className="hover:bg-[#140e1fbc] bg-[#422b6abc] flex items-center gap-2  duration-300 rounded shadow-md w-[80%] p-2 justify-center  hover:text-white text-white"
            >
              <MdGames />
              <span>New Game</span>
            </button>
          </div>
          <div className=" px-2 pt-5 flex flex-col justify-center items-center">
            {" "}
            {myDms.length > 1 && (
              <h2 className=" text-center text-white">users</h2>
            )}
            {myDms.length
              ? myDms?.map((user: Partial<User>, i: number) => (
                  <span
                    key={i}
                    className=" text-center text-[#f5f6f8] text-[11px]"
                  >
                    {user?.username}
                  </span>
                ))
              : null}
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setOpenLogout((prev) => !prev);
          const me =
            typeof localStorage !== "undefined" &&
            localStorage.getItem("home_player")
              ? JSON.parse(localStorage.getItem("home_player")!)
              : { username: "", id: "" };
          if (me) {
            socket.emit("logout", { player_id: me?.id });
          }
          localStorage.clear();
        }}
        className="hover:bg-[#140e1fbc] bg-[#422b6abc] flex items-center gap-2  duration-300 rounded shadow-md w-[80%] p-2 justify-center  hover:text-white text-white"
      >
        <CiLogout /> <span>logout</span>
      </button>

      {openLogout && (
        <>
          <Popups
            title={"Hey"}
            content={"Are you sure you want to leave the Game?"}
            actionText={"Logout"}
            onCancel={() => setOpenLogout((prev) => !prev)}
            onAction={() => {
              router.replace("/");
              setOpenLogout((prev) => !prev);
            }}
            styles={"bg-themecolor text-white rounded"}
            actionBTNStyle={"border border-red-600 text-red-600"}
          />
          <Overlay onClick={() => setOpenLogout((prev) => !prev)} />
        </>
      )}

      {startNewGame && (
        <>
          <Overlay
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </>
      )}
      {/* <Overlay />
      <CreateGame /> */}
    </div>
  );
}

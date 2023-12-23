"use client";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import Overlay from "../atoms/Overlay";
import Popups from "../atoms/Popups";
import Link from "next/link";
import CreateGame from "./CreateGame";
import { toast } from "react-toastify";

export default function SideNav() {
  const [openLogout, setOpenLogout] = useState(false);
  const [startNewGame, setStartNewGame] = useState(false);

  return (
    <div className="flex flex-col justify-between bg-themecolor w-[240px] h-[100vh] items-center py-2 px-4">
      <div className="flex flex-col gap-30">
        <div className="text-white font-bold mb-[40px]">
          <Link href={"/"}>
            <h3 className="">PockerPlay</h3>
          </Link>
        </div>
        <div>
          <div>
            <button className="bg-white p-2 rounded text-themecolor">
              New Game
            </button>
          </div>
          <div>
            {" "}
            <h2>users</h2>
          </div>
        </div>
      </div>

      <button
        onClick={() => setOpenLogout((prev) => !prev)}
        className="flex items-center justify-center  py-1 text-white gap-3 px-4"
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
            onAction={() => setOpenLogout((prev) => !prev)}
            styles={"bg-themecolor text-white rounded"}
            actionBTNStyle={"border border-red-600 text-red-600"}
          />
          <Overlay onClick={() => setOpenLogout((prev) => !prev)} transparent />
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

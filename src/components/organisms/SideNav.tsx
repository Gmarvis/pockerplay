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

export default function SideNav() {
  if(typeof localStorage === "undefined") return;
  const [openLogout, setOpenLogout] = useState(false);
  const [startNewGame, setStartNewGame] = useState(false);
  const myDms = JSON.parse(localStorage.getItem("myDM")!)  || []; 

  return (
    <div className="flex flex-col justify-between bg-themecolor w-[240px] h-[100vh] items-center py-2">
      <div className="flex flex-col w-full gap-30">
        <div className="text-white font-bold mb-[40px]">
          <Link href={"/"}>
            <h3 className=" text-center">PockerPlay</h3>
          </Link>
        </div>
        <div>
          <div>
            <button className="hover:bg-white duration-300 text-white w-full p-2  hover:text-themecolor">
              New Game
            </button>
          </div>
          <div className=" px-2 flex flex-col justify-center items-center">
            {" "}
            <h2 className=" text-center">users</h2>
            {myDms.length ? myDms?.map((user: Partial<User> ,i:number) => <span key={i} className=" text-center text-[#f5f6f8] text-[11px]">{user.username} </span> ): null}
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setOpenLogout((prev) => !prev);
          const me = typeof localStorage !== "undefined" && localStorage.getItem("home_player") ? JSON.parse(localStorage.getItem("home_player")!) : {username: "", id:""};
          if(me){
            socket.emit('logout', {player_id: me?.id});
          }
       
        }}
        className="flex items-center justify-center  py-1 hover:bg-white duration-300  hover:text-themecolor w-full text-white gap-3 px-4"
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
            onAction={() =>{
             
              const me = typeof localStorage !== "undefined" && localStorage.getItem("home_player") ? JSON.parse(localStorage.getItem("home_player")!) : {username: "", id:""};
              if(me){
                socket.emit('logout', {player_id: me?.id});
              }
              setOpenLogout((prev) => !prev);
            }}
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

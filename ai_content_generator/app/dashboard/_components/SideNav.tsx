"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import UsageTrack from "./UsageTrack";

function SideNav() {
  const MenuList = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Setting",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];



  

  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <div className="h-screen relative p-5 shadow-sm border bg-white">
      <div className="flex justify-center mb-2">
        <Image src={"/logo.svg"} alt="logo" width={50} height={100} />
      </div>

      <hr className="my-6" />

      <div className="mt-3">
        {MenuList.map((menu, index) => (
          <div
            key={index}
            className={`flex mb-2 p-3 gap-2 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center ${path == menu.path&&'bg-primary text-white'}`}
          >
            <menu.icon className="h-7 w-7" />
            <Link href={menu.path}><h2 className="text-lg">{menu.name}</h2></Link>
          </div>
        ))}
      </div>

        <div className="absolute bottom-10 left-0 w-full">
          <UsageTrack/>
        </div>

    </div>
  );
}

export default SideNav;

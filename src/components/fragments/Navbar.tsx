"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { TbLogout, TbLayoutDashboardFilled } from "react-icons/tb";
import { confirmAlert } from "@/utils/sweetalert";
import { signOut } from "next-auth/react";

const links = [
  { name: "Dashboard", path: "dashboard", icon: <TbLayoutDashboardFilled className="text-lg text-black" /> },
  { name: "Approve", path: "approve", icon: <FaCheckCircle className="text-lg text-black" /> },
];

const Navbar = () => {
  const pathname = usePathname().split("/")[1];

  const handleSignOut = async () => {
    const confirmed: boolean = await confirmAlert("Are you sure you want to sign out?");
    if (confirmed) signOut();
  };

  return (
    <div className="flex flex-col justify-between w-full h-screen py-4 mt-20 sm:mt-0">
      <div className="flex flex-col gap-4">
        {links.map((link) => (
          <Link key={link.name} href={`/${link.path}`}>
            <Button className={`${pathname === link.path ? "bg-green-500" : "bg-white"} hover:bg-green-500 w-full cursor-pointer p-1`}>
              {link.icon}
              <p className="ml-2 text-black font-semibold hidden sm:flex">{link.name}</p>
            </Button>
          </Link>
        ))}
      </div>
      <Button variant="destructive" onClick={handleSignOut}>
        <TbLogout className="text-lg" />
        <p className="ml-2font-semibold hidden sm:flex">Logout</p>
      </Button>
    </div>
  );
};

export default Navbar;

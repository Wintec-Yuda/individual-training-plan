"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { TbLogout, TbLayoutDashboardFilled } from "react-icons/tb";

const links = [
  { name: "Dashboard", path: "/dashboard", icon: <TbLayoutDashboardFilled className="text-lg text-black" /> },
  { name: "Approve", path: "/approve", icon: <FaCheckCircle className="text-lg text-black" /> },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between w-full h-screen py-4 mt-20 sm:mt-0">
      <div className="flex flex-col gap-4">
        {links.map((link) => (
          <Link key={link.name} href={link.path}>
            <Button className={`${pathname === link.path ? "bg-green-500" : "bg-white"} hover:bg-green-500 w-full cursor-pointer p-1`}>
              {link.icon}
              <p className="ml-2 text-black font-semibold hidden sm:flex">{link.name}</p>
            </Button>
          </Link>
        ))}
      </div>
      <Button className="bg-red-600 hover:bg-red-800 w-full cursor-pointer p-1">
        <TbLogout className="text-lg text-white" />
        <p className="ml-2 text-black font-semibold hidden sm:flex">Logout</p>
      </Button>
    </div>
  );
};

export default Navbar;

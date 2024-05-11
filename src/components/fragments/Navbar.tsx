import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { TbLogout, TbLayoutDashboardFilled } from "react-icons/tb";
import { PiNotepadFill } from "react-icons/pi";
import { confirmAlert } from "@/utils/sweetalert";
import { signOut, useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

const links = [
  { name: "Dashboard", path: "dashboard", icon: <TbLayoutDashboardFilled className="text-lg text-black" />, checkAccess: (user: any) => ["4", "5"].includes(user?.golongan) },
  { name: "Approve", path: "approve", icon: <FaCheckCircle className="text-lg text-black" />, checkAccess: (user: any) => ["4", "5"].includes(user?.golongan) || user?.jobTtlName === "People Development Supervisor" },
  { name: "Realization", path: "realization", icon: <PiNotepadFill className="text-lg text-black" />, checkAccess: (user: any) => user?.golongan === "4" && user?.jobTtlName === "People Development Supervisor" },
];

const Navbar = () => {
  const { data: sessionData, status: sessionStatus } = useSession();
  const pathname = usePathname().split("/")[1];

  const handleSignOut = async () => {
    const confirmed = await confirmAlert("Are you sure you want to sign out?");
    if (confirmed) signOut();
  };

  if (sessionStatus === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const user = sessionData?.user;

  return (
    <div className="flex flex-col justify-between w-full h-screen py-4 mt-20 sm:mt-0">
      <div className="flex flex-col gap-4">
        {links.map((link) => {
          if (link.checkAccess(user)) {
            return (
              <Link key={link.name} href={`/${link.path}`}>
                <Button className={`${pathname === link.path ? "bg-sky-500" : "bg-white"} hover:bg-sky-500 w-full cursor-pointer p-1`}>
                  {link.icon}
                  <p className="ml-2 text-black font-semibold hidden sm:flex">{link.name}</p>
                </Button>
              </Link>
            );
          }
          return null; // Return null for links that don't meet criteria
        })}
      </div>
      <Button variant="destructive" onClick={handleSignOut}>
        <TbLogout className="text-lg" />
        <p className="ml-2 font-semibold hidden sm:flex">Logout</p>
      </Button>
    </div>
  );
};

export default Navbar;

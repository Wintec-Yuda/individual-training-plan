"use client";

import Navbar from "@/components/fragments/Navbar";
import { greeting } from "@/utils";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { FaRegHandSpock } from "react-icons/fa";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const data: any = session.data?.user;

  return (
    <section className="flex flex-col">
      <aside className="fixed w-12 sm:w-48 h-screen backdrop-blur flex flex-col items-center justify-center sm:justify-normal gap-8 p-2">
        <div className="hidden sm:flex h-20 w-20 rounded-full bg-emerald-100 shadow shadow-emerald-100"></div>
        <Navbar />
      </aside>
      <main className="overflow-hidden bg-branch">
        <div className="w-[calc(100vw-3rem)] sm:w-[calc(100vw-12rem)] relative left-12 sm:left-48 bg-emerald-100 p-4 min-h-screen">
          <header className="flex flex-col">
            <div className="flex gap-2 items-center">
              <h1 className="text-xl md:text-2xl xl:text-3xl font-bold">
                {greeting()}, {data?.name}
              </h1>
              <FaRegHandSpock className="text-3xl" />
            </div>
            <div className="font-semibold underline">{data?.jobTtlName}</div>
          </header>
          {children}
        </div>
      </main>
    </section>
  );
};

export default DashboardLayout;

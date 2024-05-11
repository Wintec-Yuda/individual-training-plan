"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { EmployeeDataTable } from "../fragments/dataTables/Employee";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

const DashboardView = () => {
  const team = useSelector((state: any) => state.team.data);
  const session: any = useSession();
  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const nik = session?.data?.user?.nik;

  return (
    <div className="bg-emerald-50 rounded-lg mt-4">
      <Link href={`/dashboard/registration/${nik}`}>
        <Button className="m-4">Self Registration</Button>
      </Link>
      <EmployeeDataTable data={team} />
    </div>
  );
};

export default DashboardView;

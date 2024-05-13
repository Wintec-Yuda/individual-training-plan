"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { EmployeeDataTable } from "../fragments/dataTables/Employee";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { setEmployees } from "@/store/slices/employees";
import { fetcher } from "@/utils/fetcher";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const DashboardView = () => {
  const { data, error, isLoading } = useSWR("/api/employees", fetcher);
  
  const dispatch = useDispatch();
  if (!isLoading) {
    dispatch(setEmployees(data?.data));
  }

  const session: any = useSession();
  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }
  const nik = session?.data?.user?.nik;

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  ) : (
      <div className="bg-emerald-50 rounded-lg mt-4">
      <Link href={`/dashboard/registration/${nik}`}>
        <Button className="m-4">Self Registration</Button>
      </Link>
      <EmployeeDataTable data={data.data?.filter((employee: any) => employee.superiorNIK === nik)} />
    </div>
  )
};

export default DashboardView;

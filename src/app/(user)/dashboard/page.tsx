"use client";

import DashboardView from "@/components/views/Dashboard";
import { setTeam } from "@/store/slices/team";
import { fetcher } from "@/utils/fetcher";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const session: any = useSession();

  const { data, error, isLoading } = useSWR("/api/employees", fetcher);

  if (!isLoading) {
    const nik = session?.data?.user?.nik;
    dispatch(setTeam(data?.data.filter((employee: any) => employee.superiorNIK === nik)));
  }
  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : (
    <DashboardView />
  );
};

export default DashboardPage;

"use client";

import DashboardView from "@/components/views/Dashboard";
import { setEmployees } from "@/store/slices/employees";
import { fetcher } from "@/utils/fetcher";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useSWR("/api/employees", fetcher);

  if (!isLoading) {
    dispatch(setEmployees(data?.data));
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

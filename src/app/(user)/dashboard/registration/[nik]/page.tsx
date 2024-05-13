"use client";

import RegistrationView from "@/components/views/Registration";
import { setUser } from "@/store/slices/user";
import { fetcher } from "@/utils/fetcher";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const RegistrationPage = () => {
  const pathname = usePathname();
  const nik = pathname.split("/").pop();
  const { data, error, isLoading } = useSWR(`/api/employees/${nik}`, fetcher);

  const dispatch = useDispatch();
  if (!isLoading) {
    dispatch(setUser(data?.data[0]));
  }
  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  ) : (
    <RegistrationView />
  );
};

export default RegistrationPage;

"use client";

import RegistrationView from "@/components/views/Registration";
import { setCourses } from "@/store/slices/courses";
import { fetcher } from "@/utils/fetcher";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const RegistrationPage = () => {
  const { data, error, isLoading } = useSWR("/api/courses", fetcher);

  const dispatch = useDispatch();
  if (!isLoading) {
    dispatch(setCourses(data?.data));
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

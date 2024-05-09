"use client";

import RegistrationView from "@/components/views/Registration";
import { setCourses } from "@/store/slices/courses";
import { fetcher } from "@/utils/fetcher";
import { Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const RegistrationPage = () => {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useSWR("/api/courses", fetcher);

  if (!isLoading) dispatch(setCourses(data?.data[0]));
  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : (
    <RegistrationView />
  );
};

export default RegistrationPage;

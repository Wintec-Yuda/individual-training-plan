"use client";

import RealizationView from "@/components/views/Realization";
import { setCourses } from "@/store/slices/courses";
import { fetcher } from "@/utils/fetcher";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const RealizationPage = () => {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useSWR("/api/courses", fetcher);

  if (!isLoading) {
    dispatch(setCourses(data?.data));
  }
  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  ) : (
    <RealizationView />
  );
};

export default RealizationPage;

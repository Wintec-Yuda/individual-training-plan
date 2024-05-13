"use client";

import { useDispatch } from "react-redux";
import { IoArrowBackCircle } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";
import Profile from "../fragments/Profile";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Loader2 } from "lucide-react";
import ButtonProcessingCourses from "../fragments/processingCourses/Button";
import HeaderProcessingCourses from "../fragments/processingCourses/Header";
import TableProcessingCourses from "../fragments/processingCourses/Table";
import { setCourses } from "@/store/slices/courses";

const RegistrationView = () => {
  const [isCourses, setIsCourses] = useState("register");

  const { data, error, isLoading } = useSWR("/api/courses", fetcher);

  const dispatch = useDispatch();
  if (!isLoading) {
    dispatch(setCourses(data?.data));
  }

  return (
    <div className="flex flex-col gap-2">
      <Link href="/dashboard" className="w-8">
        <IoArrowBackCircle className="text-3xl text-black cursor-pointer" />
      </Link>
      <Profile />
      <ButtonProcessingCourses isCourses={isCourses} setIsCourses={setIsCourses} />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="bg-emerald-50 rounded-lg p-4">
          <HeaderProcessingCourses isCourses={isCourses} />
          <TableProcessingCourses isCourses={isCourses} />
        </div>
      )}
    </div>
  );
};

export default RegistrationView;

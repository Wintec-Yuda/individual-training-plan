"use client";

import { IoArrowBackCircle } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";
import Profile from "../fragments/Profile";
import ButtonProcessingCourses from "../fragments/processingCourses/Button";
import HeaderProcessingCourses from "../fragments/processingCourses/Header";
import TableProcessingCourses from "../fragments/processingCourses/Table";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/user";
import { Loader2 } from "lucide-react";

const RegistrationView = () => {
  const [isCourses, setIsCourses] = useState("register");

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
    <div className="flex flex-col gap-2">
      <Link href="/dashboard" className="w-8">
        <IoArrowBackCircle className="text-3xl text-black cursor-pointer" />
      </Link>
      <Profile />
      <ButtonProcessingCourses isCourses={isCourses} setIsCourses={setIsCourses} />
      <div className="bg-emerald-50 rounded-lg p-4">
        <HeaderProcessingCourses isCourses={isCourses} />
        <TableProcessingCourses isCourses={isCourses} />
      </div>
    </div>
  );
};

export default RegistrationView;

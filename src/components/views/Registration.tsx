"use client";

import { useSelector } from "react-redux";
import { CourseDataTable } from "../fragments/dataTable/Course";
import { useState } from "react";
import Profile from "../fragments/Profile";
import { IoArrowBackCircle } from "react-icons/io5";
import Link from "next/link";
import { Button } from "../ui/button";

const RegistrationView = () => {
  const [isRegisterCourses, setIsRegisterCourses] = useState(true);

  const courses: any = useSelector((state: any) => state.courses.data);
  const user: any = useSelector((state: any) => state.user.data);

  return (
    <div className="flex flex-col gap-2">
      <Link href="/dashboard" className="w-8">
        <IoArrowBackCircle className="text-3xl text-black cursor-pointer" />
      </Link>
      <Profile profile={user} />
      <div className="flex gap-2">
        <Button onClick={() => setIsRegisterCourses(true)} className={`${!isRegisterCourses ? "bg-gray-500" : "bg-blue-500"} hover:bg-blue-500`}>
          Register Courses
        </Button>
        <Button onClick={() => setIsRegisterCourses(false)} className={`${isRegisterCourses ? "bg-gray-500" : "bg-blue-500"} hover:bg-blue-500`}>
          Submit Courses
        </Button>
      </div>
      {isRegisterCourses ? (
        <div className="bg-emerald-50 rounded-lg p-4">
          <h1 className="text-2xl font-bold">Course Register List</h1>
          <CourseDataTable data={courses.filter((course: any) => course.level.includes(parseInt(user.golongan)))} isRegisterCourses />
        </div>
      ) : (
        <div className="bg-emerald-50 rounded-lg p-4">
          <h1 className="text-2xl font-bold">Course Submit List</h1>
          <CourseDataTable data={courses} />
        </div>
      )}
    </div>
  );
};

export default RegistrationView;

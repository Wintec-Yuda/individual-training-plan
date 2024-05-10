"use client";

import { useSelector } from "react-redux";
import { CourseDataTable } from "../fragments/dataTable/Course";
import { IoArrowBackCircle } from "react-icons/io5";
import Link from "next/link";
import { Button } from "../ui/button";
import Profile from "../fragments/Profile";
import { useState } from "react";

const RegistrationView = () => {
  const [isCourses, setIsCourses] = useState("list");

  const courses = useSelector((state: any) => state.courses.data);
  const user = useSelector((state: any) => state.user.data);

  return (
    <div className="flex flex-col gap-2">
      <Link href="/dashboard" className="w-8">
        <IoArrowBackCircle className="text-3xl text-black cursor-pointer" />
      </Link>
      <Profile />
      <div className="flex gap-2">
        {["list", "register", "submit"].map((type: string) => (
          <Button key={type} onClick={() => setIsCourses(type)} className={`${isCourses === type ? "bg-blue-500" : "bg-white text-black border border-black"} hover:bg-blue-500`}>
            {type === "list" ? "Courses List" : type === "register" ? "Registered Courses" : "Submit Courses"}
          </Button>
        ))}
      </div>
      <div className="bg-emerald-50 rounded-lg p-4">
        <h1 className="text-2xl font-bold">{isCourses === "list" ? "Course List" : isCourses === "register" ? "Registered Course List" : "Submit Course List"}</h1>
        <CourseDataTable
          data={courses.filter((course: any) => {
            if (isCourses === "list") {
              const level = course.level.includes(parseInt(user.golongan));
              const employeeKeys = Object.keys(course.employees || {});
              return level && !employeeKeys.includes(user.nik);
            } else if (isCourses === "register") {
              const employeeKeys = Object.keys(course.employees || {});
              const employeeData = user && course.employees && course.employees[user.nik];
              return employeeKeys.includes(user.nik) && employeeData.isSubmit === false;
            } else if (isCourses === "submit") {
              const employeeData = user && course.employees && course.employees[user.nik];
              return employeeData && employeeData.isSubmit === true;
            }
            return false;
          })}
          isCourses={isCourses}
        />
      </div>
    </div>
  );
};

export default RegistrationView;

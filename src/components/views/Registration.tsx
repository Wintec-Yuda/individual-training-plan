"use client";

import { useSelector } from "react-redux";
import { CourseDataTable } from "../fragments/dataTables/Course";
import { IoArrowBackCircle } from "react-icons/io5";
import Link from "next/link";
import { Button } from "../ui/button";
import Profile from "../fragments/Profile";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "../ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import CourseDetail from "../fragments/details/Course";

const RegistrationView = () => {
  const [isCourses, setIsCourses] = useState("register");

  const courses = useSelector((state: any) => state.courses.data);
  const user = useSelector((state: any) => state.user.data);

  return (
    <div className="flex flex-col gap-2">
      <Link href="/dashboard" className="w-8">
        <IoArrowBackCircle className="text-3xl text-black cursor-pointer" />
      </Link>
      <Profile />
      <div className="flex gap-2">
        {["register", "submit", "submitted"].map((type: string) => (
          <Button key={type} onClick={() => setIsCourses(type)} className={`${isCourses === type ? "bg-blue-600" : "bg-white text-black border border-black"} hover:bg-blue-600`}>
            {type === "register" ? "Courses List" : type === "submit" ? "Registered Courses" : "Submitted Courses"}
          </Button>
        ))}
      </div>
      <div className="bg-emerald-50 rounded-lg p-4">
        {isCourses === "register" && <h1 className="text-2xl font-bold">Course List</h1>}
        {isCourses === "submit" && (
          <div className="flex gap-4">
            <h1 className="text-2xl font-bold">Register Course List</h1>
            <Dialog>
              <DialogTrigger>
                <Button className="bg-red-600 hover:bg-red-800">Cek Reject Courses</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reject Courses List</DialogTitle>
                  <DialogDescription>
                    <div className="grid w-full gap-2">
                      <RejectCourseList
                        data={courses.filter((course: any) => {
                          const employeeKeys = Object.keys(course.employees || {});
                          const employeeData = user && course.employees && course.employees[user.nik];
                          return employeeKeys.includes(user.nik) && employeeData.isSubmit === false && employeeData.message;
                        })}
                        nik={user.nik}
                      />
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        )}
        {isCourses === "submitted" && (
          <div className="flex gap-4">
            <h1 className="text-2xl font-bold">Submitted Course List</h1>
            <Dialog>
              <DialogTrigger>
                <Button className="bg-yellow-600 hover:bg-yellow-800">Cek Approve Courses</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Approve Courses List</DialogTitle>
                  <DialogDescription>
                    <div className="grid w-full gap-2">
                      <ApproveCourseList
                        data={courses.filter((course: any) => {
                          const employeeData = user && course.employees && course.employees[user.nik];
                          return employeeData && employeeData.isSubmit === true;
                        })}
                        nik={user.nik}
                      />
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        )}
        <CourseDataTable
          data={courses.filter((course: any) => {
            if (isCourses === "register") {
              const level = course.level.includes(parseInt(user.golongan));
              const employeeKeys = Object.keys(course.employees || {});
              return level && !employeeKeys.includes(user.nik);
            } else if (isCourses === "submit") {
              const employeeKeys = Object.keys(course.employees || {});
              const employeeData = user && course.employees && course.employees[user.nik];
              return employeeKeys.includes(user.nik) && employeeData.isSubmit === false;
            } else if (isCourses === "submitted") {
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

const RejectCourseList = ({ data, nik }: any) => {
  return (
    <div className="grid sm:grid-cols-2 gap-2 mt-2">
      {data.map((course: any) => (
        <div key={course.courseCode} className="text-center">
          <HoverCard>
            <HoverCardTrigger>
              <Badge className="font-medium cursor-pointer">{course.code}</Badge>
            </HoverCardTrigger>
            <HoverCardContent className="w-[30rem]">
              <CourseDetail code={course.code} />
            </HoverCardContent>
          </HoverCard>
          <p className="mt-2 p-2 bg-red-100 border border-black text-black">{course.employees[nik].message}</p>
        </div>
      ))}
    </div>
  );
};
const ApproveCourseList = ({ data, nik }: any) => {
  return (
    <div className="grid sm:grid-cols-2 gap-2 mt-2">
      {data.map((course: any) => (
        <div key={course.courseCode} className="text-center">
          <HoverCard>
            <HoverCardTrigger>
              <Badge className="font-medium cursor-pointer">{course.code}</Badge>
            </HoverCardTrigger>
            <HoverCardContent className="w-[30rem]">
              <CourseDetail code={course.code} />
            </HoverCardContent>
          </HoverCard>
          <p className="mt-2 p-2 bg-yellow-100 border border-black text-black">Approve {course.employees[nik].approve}</p>
        </div>
      ))}
    </div>
  );
};

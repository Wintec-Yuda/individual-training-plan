"use client";

import { useSelector } from "react-redux";
import { CourseDataTable } from "../fragments/dataTable/Course";
import { useEffect, useState } from "react";
import DataService from "@/lib/json/service";
import { usePathname } from "next/navigation";
import { Loader } from "lucide-react";
import Profile from "../fragments/Profile";
import { IoArrowBackCircle } from "react-icons/io5";
import Link from "next/link";
import { Button } from "../ui/button";

const RegistrationView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>({});
  const [filteredCourses, setFilteredCourses] = useState<any>([]);
  const [isRegisterCourses, setIsRegisterCourses] = useState<any>(true);
  const [registerCourses, setRegisterCourses] = useState<any>([]);

  const pathname = usePathname();
  const courses = useSelector((state: any) => state.course.data);
  const employees = useSelector((state: any) => state.employee.data);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const dataService = new DataService();
        const nik: string | undefined = pathname.split("/").pop();
        const data: any = await dataService.getDataUser(nik);
        setUser(data);
        const filteredData = courses.filter((course: any) => course.level.includes(parseInt(data.golongan)));
        setFilteredCourses(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [employees, isRegisterCourses]);

  return (
    <div className="flex flex-col gap-2">
      <Link href="/dashboard" className="w-8">
        <IoArrowBackCircle className="text-3xl text-black cursor-pointer" />
      </Link>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader className="text-white" />
        </div>
      ) : (
        <Profile user={user} />
      )}
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
          <CourseDataTable data={filteredCourses} user={user} isRegisterCourses />
        </div>
      ) : (
        <div className="bg-emerald-50 rounded-lg p-4">
          <h1 className="text-2xl font-bold">Course Submit List</h1>
          <CourseDataTable data={registerCourses} user={user} isRegisterCourses={false} />
        </div>
      )}
    </div>
  );
};

export default RegistrationView;

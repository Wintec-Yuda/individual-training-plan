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

const RegistrationView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>({});
  const [filteredCourses, setFilteredCourses] = useState<any>([]);

  const pathname = usePathname();
  const courses = useSelector((state: any) => state.course.data);

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
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Link href="/dashboard">
        <IoArrowBackCircle className="text-3xl text-black cursor-pointer" />
      </Link>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader className="text-white" />
        </div>
      ) : (
        <Profile user={user} />
      )}
      <div className="bg-emerald-50 rounded-lg p-4">
        <h1 className="text-2xl font-bold">Course List</h1>
        <CourseDataTable data={filteredCourses} />
      </div>
    </div>
  );
};

export default RegistrationView;

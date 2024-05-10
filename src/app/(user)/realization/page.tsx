"use client";

import RealizationView from "@/components/views/Realization";
import { setCourses } from "@/store/slices/courses";
import { setRealizationCourses } from "@/store/slices/realizationCourses";
import { fetcher } from "@/utils/fetcher";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

const RealizationPage = () => {
  const dispatch = useDispatch();

  const courses = useSelector((state: any) => state.courses.data);
  const { data, error, isLoading } = useSWR("/api/courses", fetcher);

  if (!isLoading) {
    dispatch(setCourses(data?.data));
    const realizationCourses = courses.flatMap((course: any) => {
      const employeesWithApprove5 = Object.entries(course.employees)
        .filter(([nik, employee]: [string, any]) => employee.approve === 5)
        .map(([nik, employee]: [string, any]) => ({
          nik: nik,
          name: employee.name,
          codeCourse: course.code,
          nameCourse: course.name,
        }));

      return employeesWithApprove5;
    });

    console.log("realizationCourses", realizationCourses);

    dispatch(setRealizationCourses(realizationCourses));
  }
  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : (
    <RealizationView />
  );
};

export default RealizationPage;

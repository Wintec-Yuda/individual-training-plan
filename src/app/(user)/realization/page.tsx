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
    const realizationCourses = courses
      .filter((course: any) => {
        return course.employees.some((employee: any) => employee.approve === 5);
      })
      .map((course: any) => {
        return course.employees
          .filter((employee: any) => employee.approve === 5)
          .map((employee: any) => {
            return {
              nik: employee.nik,
              name: employee.name,
              yearRealization: employee.yearRealization,
              codeCourse: course.code,
              nameCourse: course.name,
            };
          });
      })
      .flat();

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

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
    const realizationCourses = courses.filter((course: any) => {
      if (course.employees.approve === 5) {
        return {
          nik: course.employees.nik,
          name: course.employees.name,
          codeCourse: course.code,
          nameCourse: course.name,
          }
        }
    });

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

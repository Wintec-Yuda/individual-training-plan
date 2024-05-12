"use client";

import ApproveView from "@/components/views/Approve";
import { setApproves } from "@/store/slices/approves";
import { setCourses } from "@/store/slices/courses";
import { setRegisteredCourses } from "@/store/slices/registeredCourses";
import { fetcher } from "@/utils/fetcher";
import { errorAlert } from "@/utils/sweetalert";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

const ApprovePage = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetcher("/api/courses");
        dispatch(setCourses(data?.data));
      } catch (error: any) {
        errorAlert(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const courses = useSelector((state: any) => state.courses.data);
  const { data, error, isLoading } = useSWR("/api/approvals", fetcher);

  if (!isLoading) {
    dispatch(setApproves(data?.data));
    const registeredCourses = courses.filter((course: any) => course.employees?.length > 0);

    dispatch(setRegisteredCourses(registeredCourses));
  }
  return isLoading && !loading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : (
    <ApproveView />
  );
};

export default ApprovePage;

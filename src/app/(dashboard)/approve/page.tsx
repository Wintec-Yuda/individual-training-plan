"use client";

import ApproveView from "@/components/views/Approve";
import { setApprovals } from "@/store/slices/approvals";
import { setRegisteredCourses } from "@/store/slices/registeredCourses";
import { fetcher } from "@/utils/fetcher";
import { errorAlert } from "@/utils/sweetalert";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const ApprovePage = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetcher("/api/approvals");
        dispatch(setApprovals(data.data));
      } catch (error: any) {
        errorAlert(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { data, error, isLoading } = useSWR("/api/courses", fetcher);

  if (!isLoading) {
    const registeredCourses = data?.data.filter((course: any) => course.employees && Object.keys(course.employees).length > 0);

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

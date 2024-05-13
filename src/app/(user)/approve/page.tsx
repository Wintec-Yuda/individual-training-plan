"use client";

import ApproveView from "@/components/views/Approve";
import { setApproves } from "@/store/slices/approves";
import { setCourses } from "@/store/slices/courses";
import { fetcher } from "@/utils/fetcher";
import { errorAlert } from "@/utils/sweetalert";
import { Loader2 } from "lucide-react";
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

  const { data, error, isLoading } = useSWR("/api/approvals", fetcher);

  if (!isLoading) {
    dispatch(setApproves(data?.data));
  }
  return isLoading && !loading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  ) : (
    <ApproveView />
  );
};

export default ApprovePage;

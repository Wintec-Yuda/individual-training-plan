"use client";

import RegistrationView from "@/components/views/Registration";
import { setCourses } from "@/store/slices/courses";
import { setUser } from "@/store/slices/user";
import { fetcher } from "@/utils/fetcher";
import { errorAlert } from "@/utils/sweetalert";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const nik = pathname.split("/").pop();
      try {
        const data = await fetcher(`/api/employees/${nik}`);
        dispatch(setUser(data.data[0]));
      } catch (error: any) {
        errorAlert(error.response.data.message);
      }
    };
    fetchData();
  }, []);

  const { data, error, isLoading } = useSWR("/api/courses", fetcher);

  if (!isLoading) {
    dispatch(setCourses(data?.data));
  }
  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : (
    <RegistrationView />
  );
};

export default RegistrationPage;

"use client";

import RegistrationView from "@/components/views/Registration";
import { setCourses } from "@/store/slices/courses";
import { setUser } from "@/store/slices/user";
import { fetcher } from "@/utils/fetcher";
import { errorAlert } from "@/utils/sweetalert";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const RegistrationPage = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const nik = pathname.split("/").pop();
      try {
        const data = await fetcher(`/api/employees/${nik}`);
        dispatch(setUser(data.data[0]));
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
    dispatch(setCourses(data?.data));
  }
  return isLoading && !loading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : (
    <RegistrationView />
  );
};

export default RegistrationPage;

"use client";

import DashboardView from "@/components/views/Dashboard";
import DataService from "@/lib/json/service";
import { setTeam } from "@/store/slices/team";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const dataService = new DataService();
        const data = await dataService.getDataTeam();
        dispatch(setTeam(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader className="text-white" />
    </div>
  ) : (
    <DashboardView />
  );
};

export default DashboardPage;

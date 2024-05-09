"use client";

import DashboardView from "@/components/views/Dashboard";
import DataService from "@/lib/json/service";
import { setEmployee } from "@/store/slices/employee";
import { setTeam } from "@/store/slices/team";
import { setUser } from "@/store/slices/user";
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
        const data: any = await dataService.getData();
        const dataTeam = await dataService.getDataTeam();
        const dataUser = await dataService.getDataUser("000500022");
        dispatch(setEmployee(data));
        dispatch(setTeam(dataTeam));
        dispatch(setUser(dataUser));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div className="flex justify-center items-center">
      <Loader className="text-white" />
    </div>
  ) : (
    <DashboardView />
  );
};

export default DashboardPage;

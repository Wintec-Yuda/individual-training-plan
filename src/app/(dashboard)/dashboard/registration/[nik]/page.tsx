"use client"

import RegistrationView from "@/components/views/Registration";
import DataService from "@/lib/json/service";
import { setCourse } from "@/store/slices/course";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const RegistrationPage = ({ employee }: any) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const dataService = new DataService();
          const data = await dataService.getDataCourse();
          
          dispatch(setCourse(data));
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
      <RegistrationView />
    );
};

export default RegistrationPage;

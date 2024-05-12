import { useSelector } from "react-redux";
import { RealizationDataTable } from "../fragments/dataTables/Realization";
import { useState } from "react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getYears } from "@/utils";

const RealizationView = () => {
  const [isRealization, setIsRealization] = useState("unrealization");
  const [year, setYear] = useState("");

  const realizationCourses = useSelector((state: any) => state.realizationCourses.data);

  return (
    <div className="bg-emerald-50 rounded-lg p-4">
      <div className="flex justify-between w-full">
        <Button onClick={() => setIsRealization("unrealization")} className={`${isRealization === "unrealization" ? "bg-blue-600" : "bg-white text-black border border-black"} hover:bg-blue-600`}>
          Courses List
        </Button>
        <div className="flex space-x-2">
          <Select onValueChange={(value: any) => setYear(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select the year" />
            </SelectTrigger>
            <SelectContent>
              {getYears().map((year: any) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setIsRealization("realization")} className={`${isRealization === "realization" ? "bg-blue-600" : "bg-white text-black border border-black"} hover:bg-blue-600`}>
            Realization Courses List
          </Button>
        </div>
      </div>
      <RealizationDataTable data={realizationCourses.filter((course: any) => {
        if (isRealization === "unrealization") {
          return typeof course.yearRealization === "undefined";
        } else if (isRealization === "realization") {
          return course.yearRealization === year;
        }
      })} />
    </div>
  );
};

export default RealizationView;

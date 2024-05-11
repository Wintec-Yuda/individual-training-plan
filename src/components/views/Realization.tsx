import { useSelector } from "react-redux";
import { RealizationDataTable } from "../fragments/dataTables/Realization";

const RealizationView = () => {
  const realizationCourses = useSelector((state: any) => state.realizationCourses.data);

  return (
    <div className="bg-emerald-50 rounded-lg p-4">
      <h1 className="text-2xl font-bold">Realization Courses</h1>
      <RealizationDataTable data={realizationCourses} />;
    </div>
  );
};

export default RealizationView;

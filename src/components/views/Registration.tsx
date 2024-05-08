import { useSelector } from "react-redux";
import { CourseDataTable } from "../fragments/dataTable/Course";

const RegistrationView = () => {
  const courses = useSelector((state: any) => state.course.data);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <CourseDataTable data={courses} />
      </div>
    </div>
  );
};

export default RegistrationView;

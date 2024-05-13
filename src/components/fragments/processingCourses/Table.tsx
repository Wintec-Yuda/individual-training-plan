import { useSelector } from "react-redux";
import { CourseEmployeeDataTable } from "../dataTables/CourseEmployee";

const TableProcessingCourses = ({ isCourses }: { isCourses: string }) => {
  const user = useSelector((state: any) => state.user.data);
  const courses = useSelector((state: any) => state.courses.data);

  return (
    <CourseEmployeeDataTable
      data={courses.filter((course: any) => {
        if (isCourses === "register") {
          const isRegister = Array.isArray(course?.employees) && course.employees.some((employee: any) => employee && employee.nik === user.nik);
          return course.golongans?.includes(user.golongan) && course.isActive && !isRegister;
        } else if (isCourses === "submit") {
          const isRegister = Array.isArray(course?.employees) && course.employees.some((employee: any) => employee && employee.nik === user.nik && employee.isSubmit === false);
          return isRegister;
        } else if (isCourses === "submitted") {
          const isSubmit = Array.isArray(course?.employees) && course.employees.some((employee: any) => employee && employee.nik === user.nik && employee.isSubmit === true && !employee.yearRealization);
          return isSubmit;
        } else if (isCourses === "realization") {
          const isSubmit = Array.isArray(course?.employees) && course.employees.some((employee: any) => employee && employee.nik === user.nik && employee.isSubmit === true && employee.yearRealization);
          return isSubmit;
        }
        return false;
      })}
      isCourses={isCourses}
    />
  );
};

export default TableProcessingCourses;

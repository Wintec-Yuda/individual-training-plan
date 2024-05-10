import { useSelector } from "react-redux";
import { ApproveDataTable } from "../fragments/dataTable/Approve";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { IEmployee } from "@/interfaces";

const ApproveView = () => {
  const registeredCourses = useSelector((state: any) => state.registeredCourses.data);
  const approves = useSelector((state: any) => state.approves.data);
  
  const session: any = useSession();
  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const nik = session?.data?.user?.nik;

  const userApproves = approves.filter((approval: any) => approval.nik === nik);

  const submittedCourses: any = [];

  registeredCourses.forEach((course: any) => {
    const employees = course.employees;
    Object.entries<IEmployee>(employees).forEach(([nik, employee]) => {
      if (employee.isSubmit) {
        userApproves.forEach((approval: any) => {
          if (approval.empccnames) {
            if (approval.empccnames.includes(employee.empccname) && approval.approve == employee.approve) {
              submittedCourses.push({
                nik: nik,
                name: employee.name,
                approve: employee.approve,
                codeCourse: course.code,
                nameCourse: course.name,
              });
            }
          } else if (approval.golongans) {
            if (approval.golongans.includes(employee.golongan) && approval.approve == employee.approve) {
              submittedCourses.push({
                nik: nik,
                name: employee.name,
                approve: employee.approve,
                codeCourse: course.code,
                nameCourse: course.name,
              });
            }
          }
        });
      }
    });
  });

  return (
    <div className="bg-emerald-50 rounded-lg p-4">
      <h1 className="text-2xl font-bold">Approve Submitted Courses</h1>
      <ApproveDataTable data={submittedCourses} />;
    </div>
  );
};

export default ApproveView;

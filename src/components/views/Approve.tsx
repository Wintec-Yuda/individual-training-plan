"use client";

import { useSelector } from "react-redux";
import { ApproveDataTable } from "../fragments/dataTables/Approve";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

const ApproveView = () => {
  const courses = useSelector((state: any) => state.courses.data);

  const { data, error, isLoading } = useSWR("/api/approvals", fetcher);

  const session: any = useSession();
  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const nik = session?.data?.user?.nik;
  const approvesCourses: any = [];

  if (!isLoading) {
    courses.map((course: any) => {
      course.employees?.map((employee: any) => {
        if (employee.isSubmit) {
          data?.data
            .filter((approval: any) => approval.nik === nik)
            .map((approval: any) => {
              if (approval.empccnames) {
                if (approval.empccnames.includes(employee.empccname) && approval.approve == employee.approve) {
                  approvesCourses.push({
                    nik: employee.nik,
                    name: employee.name,
                    approve: employee.approve,
                    codeCourse: course.code,
                    nameCourse: course.name,
                  });
                }
              } else if (approval.golongans) {
                if (approval.golongans.includes(employee.golongan) && approval.approve == employee.approve) {
                  approvesCourses.push({
                    nik: employee.nik,
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
  }
  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  ) : (
    <div className="bg-emerald-50 rounded-lg p-4">
      <h1 className="text-2xl font-bold">Approve Submitted Courses</h1>
      <ApproveDataTable data={approvesCourses} />
    </div>
  );
};

export default ApproveView;

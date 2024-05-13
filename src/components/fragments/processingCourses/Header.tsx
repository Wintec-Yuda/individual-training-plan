import { FaHistory } from "react-icons/fa";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import CourseDetail from "../details/Course";
import { Badge } from "@/components/ui/badge";
import EmployeeDetail from "../details/Employee";
import { useSelector } from "react-redux";

const HeaderProcessingCourses = ({ isCourses }: { isCourses: string }) => {
  const user = useSelector((state: any) => state.user.data);
  const courses = useSelector((state: any) => state.courses.data);

  return (
    <>
      {isCourses === "register" && <h1 className="text-2xl font-bold">Course List</h1>}
      {isCourses === "submit" && (
        <div className="flex gap-4">
          <h1 className="text-2xl font-bold">Register Course List</h1>
          <CheckDialog title="Reject Courses List" buttonLabel="Check Reject Courses" className="bg-red-600 hover:bg-red-800">
            <CourseStatusList
              data={courses
                .filter((course: any) => {
                  return course.employees?.some((employee: any) => {
                    return employee.nik === user.nik && employee.isSubmit === false && employee.rejects;
                  });
                })
                .map((course: any) => {
                  const employee = course.employees.find((emp: any) => emp.nik === user.nik && emp.isSubmit === false);
                  return { code: course.code, message: employee.message, rejects: employee.rejects };
                })}
              status="reject"
            />
          </CheckDialog>
        </div>
      )}
      {isCourses === "submitted" && (
        <div className="flex gap-4">
          <h1 className="text-2xl font-bold">Submitted Course List</h1>
          <CheckDialog title="Approve Courses List" buttonLabel="Check Approve Courses" className="bg-yellow-600 hover:bg-yellow-800">
            <CourseStatusList
              data={courses
                .filter((course: any) => {
                  return course.employees?.some((employee: any) => {
                    return employee.nik === user.nik && employee.isSubmit === true && employee.approvals;
                  });
                })
                .map((course: any) => {
                  const employee = course.employees.find((emp: any) => emp.nik === user.nik && emp.isSubmit === true);
                  return { code: course.code, approve: employee.approve, approvals: employee.approvals };
                })}
              status="approve"
            />
          </CheckDialog>
        </div>
      )}
      {isCourses === "realization" && (
        <div className="flex gap-4">
          <h1 className="text-2xl font-bold">Realization Course List</h1>
          <CheckDialog title="Realization Courses List" buttonLabel="Check Realization Courses" className="bg-purple-600 hover:bg-purple-800">
            <CourseRealizationList
              data={courses
                .filter((course: any) => {
                  return course.employees?.some((employee: any) => {
                    return employee.nik === user.nik && employee.isSubmit === true && employee.approvals && employee.yearRealization;
                  });
                })
                .map((course: any) => {
                  const employee = course.employees.find((emp: any) => emp.nik === user.nik && emp.isSubmit === true && emp.yearRealization);
                  return { code: course.code, year: employee.yearRealization };
                })}
            />
          </CheckDialog>
        </div>
      )}
    </>
  );
};

export default HeaderProcessingCourses;

const CheckDialog = ({ title, buttonLabel, className, children }: any) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className={className}>{buttonLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-center">{title}</DialogTitle>
          <DialogDescription>
            <div className="grid w-full gap-2">{children}</div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const CourseStatusList = ({ data, status }: any) => {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mt-2">
      {data.map((course: any) => (
        <div key={course.code} className="text-center">
          <HoverCard>
            <HoverCardTrigger>
              <Badge className="font-medium cursor-pointer">{course.code}</Badge>
            </HoverCardTrigger>
            <HoverCardContent className="w-[30rem]">
              <CourseDetail code={course.code} />
            </HoverCardContent>
          </HoverCard>
          <div className={`mt-2 p-2 flex gap-2 justify-center items-center rounded border border-black ${status === "approve" ? "bg-yellow-100" : "bg-red-100"} text-black`}>
            <div>{status === "approve" ? `Approve ${course.approve}` : course.message}</div>
            <HoverCard>
              <HoverCardTrigger>
                <div className={`cursor-pointer border border-black rounded-full ${status === "approve" ? "bg-yellow-200 p-2 hover:bg-yellow-400" : "bg-red-200 p-2 hover:bg-red-400"}`}>
                  <FaHistory />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-[50rem]">
                {status === "approve" ? (
                  <div className="grid w-full gap-2">
                    {course.approvals?.map((approval: any) => (
                      <div key={approval.nik} className="flex gap-2 justify-center items-center bg-yellow-100 p-2">
                        <HoverCard>
                          <HoverCardTrigger>
                            <Badge className="font-medium cursor-pointer">{approval.nik}</Badge>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-[30rem]">
                            <EmployeeDetail nik={approval.nik} />
                          </HoverCardContent>
                        </HoverCard>
                        <div className="border-l-2 border-black">
                          <p className="ms-2">{approval.name}</p>
                        </div>
                        <div className="border-l-2 border-black">
                          <p className="ms-2">Approve {approval.approve}</p>
                        </div>
                        <div className="border-l-2 border-black">
                          <p className="ms-2">{approval.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {course.rejects?.map((reject: any) => (
                      <div key={reject.nik} className="flex gap-2 justify-center items-center bg-red-100 p-2">
                        <HoverCard>
                          <HoverCardTrigger>
                            <Badge className="font-medium cursor-pointer">{reject.nik}</Badge>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-[30rem]">
                            <EmployeeDetail nik={reject.nik} />
                          </HoverCardContent>
                        </HoverCard>
                        <div className="border-l-2 border-black">
                          <p className="ms-2">{reject.name}</p>
                        </div>
                        <div className="border-l-2 border-black">
                          <p className="ms-2">{reject.message}</p>
                        </div>
                        <div className="border-l-2 border-black">
                          <p className="ms-2">{reject.date}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      ))}
    </div>
  );
};

const CourseRealizationList = ({ data }: any) => {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mt-2">
      {data.map((course: any) => (
        <div key={course.code} className="text-center">
          <HoverCard>
            <HoverCardTrigger>
              <Badge className="font-medium cursor-pointer">{course.code}</Badge>
            </HoverCardTrigger>
            <HoverCardContent className="w-[30rem]">
              <CourseDetail code={course.code} />
            </HoverCardContent>
          </HoverCard>
          <div className="mt-2 p-2 flex gap-2 justify-center items-center rounded border border-black bg-purple-100 text-black">Realization in {course.year}</div>
        </div>
      ))}
    </div>
  );
};

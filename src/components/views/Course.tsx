"use client";

import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { CourseListDataTable } from "../fragments/dataTables/CourseList";

const CourseView = () => {
  const courses = useSelector((state: any) => state.courses.data);

  return (
    <div className="bg-emerald-50 rounded-lg p-4">
      <h1 className="text-2xl font-bold">Course List</h1>
      <div className="flex gap-2">
        <Button className="bg-blue-600 hover:bg-blue-800">Add Course</Button>
      </div>
      <CourseListDataTable data={courses} />
    </div>
  );
};

export default CourseView;

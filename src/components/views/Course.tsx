"use client";

import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { CourseListDataTable } from "../fragments/dataTables/CourseList";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CourseForm } from "../fragments/form/Course";

const CourseView = () => {
  const courses = useSelector((state: any) => state.courses.data);

  return (
    <div className="bg-emerald-50 rounded-lg p-4">
      <h1 className="text-2xl font-bold">Course List</h1>
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger>
            <Button className="bg-blue-600 hover:bg-blue-800">Add Course</Button>
          </DialogTrigger>
          <DialogContent className="bg-transparent backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="text-center text-white">Add course Data</DialogTitle>
              <DialogDescription>
                <div className="grid w-full">
                  <CourseForm />
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <CourseListDataTable data={courses} />
    </div>
  );
};

export default CourseView;

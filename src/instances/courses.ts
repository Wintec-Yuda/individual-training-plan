import instance from "@/lib/axios/instance";

const coursesInstance = {
  manageCoursesEmployee: (data: any, token: string) =>
    instance.put("/api/courses/", data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  addCourse: (data: any, token: string) =>
    instance.post("/api/courses/", data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  editCourse: (data: any, id: string, token: string) =>
    instance.put(`/api/courses/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default coursesInstance;

import instance from "@/lib/axios/instance";

const coursesInstance = {
  manageCoursesEmployee: (nik: string, action: string, data: any, token: string) =>
    instance.put(`/api/courses/${action}/${nik}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default coursesInstance;

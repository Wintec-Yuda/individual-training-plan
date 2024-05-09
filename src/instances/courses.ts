import instance from "@/lib/axios/instance";

const coursesInstance = {
  addEmployee: (nik: string, data: any, token: string) =>
    instance.put(`/api/courses/${nik}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default coursesInstance;

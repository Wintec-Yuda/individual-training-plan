import instance from "@/lib/axios/instance";

const employeeInstance = {
  getDataByNik: async (nik: string) => {
    instance.get(`api/employees/${nik}`);
  },
};

export default employeeInstance;

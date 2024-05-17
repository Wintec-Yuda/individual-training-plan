import instance from "@/lib/axios/instance";

const auditsInstance = {
  addAudit: (data: any, token: string) =>
    instance.post("/api/audits/", data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default auditsInstance;

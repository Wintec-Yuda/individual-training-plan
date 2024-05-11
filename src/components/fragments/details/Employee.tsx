"use client";

import { fetcher } from "@/utils/fetcher";
import { Loader2 } from "lucide-react";
import useSWR from "swr";
import { Card, CardContent } from "@/components/ui/card";

const EmployeeDetail = ({ nik }: { nik: string }) => {
  const { data, error, isLoading } = useSWR(`/api/employees/${nik}`, fetcher);

  return isLoading ? (
    <div className="flex justify-center items-center">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  ) : (
    <div>
      <Card>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Content>
              <p className="font-bold">NIK:</p>
              <p>{data.data[0].nik}</p>
            </Content>
            <Content>
              <p className="font-bold">Name:</p>
              <p>{data.data[0].name}</p>
            </Content>
            <Content>
              <p className="font-bold">Type Group:</p>
              <p>{data.data[0].empTypeGroup}</p>
            </Content>
            <Content>
              <p className="font-bold">Golongan:</p>
              <p>{data.data[0].golongan}</p>
            </Content>
            <Content>
              <p className="font-bold">CC:</p>
              <p>{data.data[0].empccname}</p>
            </Content>
            <Content>
              <p className="font-bold">Job Title:</p>
              <p>{data.data[0].jobTtlName}</p>
            </Content>
            <Content>
              <p className="font-bold">Location:</p>
              <p>{data.data[0].locationName}</p>
            </Content>
            <Content>
              <p className="font-bold">Superior:</p>
              <p>{data.data[0].superiorName}</p>
            </Content>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDetail;

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col bg-emerald-50 p-2 rounded border border-black">
      {children}
    </div>
  );
};

"use client";

import { fetcher } from "@/utils/fetcher";
import { Loader2 } from "lucide-react";
import useSWR from "swr";
import { Card, CardContent } from "@/components/ui/card";

const CourseDetail = ({ code }: { code: string }) => {
  const { data, error, isLoading } = useSWR(`/api/courses/${code}`, fetcher);

  return isLoading ? (
    <div className="flex justify-center items-center">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  ) : (
    <div>
      <Card>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-2">
            <Content>
              <p className="font-bold">Code:</p>
              <p>{data.data[0].code}</p>
            </Content>
            <Content>
              <p className="font-bold">Name:</p>
              <p>{data.data[0].name}</p>
            </Content>
            <Content>
              <p className="font-bold">Category:</p>
              <p>{data.data[0].category}</p>
            </Content>
            <Content>
              <p className="font-bold">Duration:</p>
              <p>{data.data[0].duration}</p>
            </Content>
            <Content className="col-span-2">
              <p className="font-bold">Target:</p>
              <p>{data.data[0].target}</p>
            </Content>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetail;

const Content = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <div className={`${className} flex flex-col bg-emerald-50 p-2 rounded border border-black`}>{children}</div>;
};

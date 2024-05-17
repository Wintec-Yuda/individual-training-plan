"use client";

import AuditView from "@/components/views/Audit";
import { setAudits } from "@/store/slices/audits";
import { fetcher } from "@/utils/fetcher";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const AuditPage = () => {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useSWR("/api/audits", fetcher);

  if (!isLoading) {
    dispatch(setAudits(data?.data));
  }
  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  ) : (
    <AuditView />
  );
};

export default AuditPage;

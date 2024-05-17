import React from "react";
import { useSelector } from "react-redux";
import { AuditDataTable } from "../fragments/dataTables/Audit";

const AuditView = () => {
  const audits = useSelector((state: any) => state.audits.data);

  return (
    <div className="bg-emerald-50 rounded-lg p-4">
      <h1 className="text-2xl font-bold">Audit Trail Employee</h1>
      <AuditDataTable data={audits} />
    </div>
  );
};

export default AuditView;

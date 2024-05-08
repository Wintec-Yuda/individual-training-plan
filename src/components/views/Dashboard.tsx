import Link from "next/link";
import { Button } from "../ui/button";
import { EmployeeDataTable } from "../fragments/dataTable/Employee";
import { useSelector } from "react-redux";

const DashboardView = () => {
  const team = useSelector((state: any) => state.team.data);

  return (
    <div className="bg-emerald-50 rounded-lg mt-4">
      <Link href="/dashboard/registration">
        <Button className="m-4">Self Registration</Button>
      </Link>
      <EmployeeDataTable data={team} />
    </div>
  );
};

export default DashboardView;

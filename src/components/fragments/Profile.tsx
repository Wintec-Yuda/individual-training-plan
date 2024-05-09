import { calculateYearsSince } from "@/utils";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const Profile = () => {
  const user: any = useSelector((state: any) => state.user.data);
  return (
    <div className="p-4 border-2 border-white flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Box>
          <div>NIK</div>
          <Badge>{user.nik}</Badge>
        </Box>
        <Box>
          <div>Employee Type</div>
          <Badge>{user.empTypeGroup}</Badge>
        </Box>
        <Box>
          <div>Job Title</div>
          <Badge>{user.jobTtlName}</Badge>
        </Box>
        <Box>
          <div>Department</div>
          <Badge>{user.deptName}</Badge>
        </Box>
        <Box>
          <div>Location</div>
          <Badge>{user.locationName}</Badge>
        </Box>
        <Box>
          <div>Employee Date</div>
          <Badge>{`${calculateYearsSince(user.joinDate)[0]} | ${calculateYearsSince(user.joinDate)[1]} Year(s), ${calculateYearsSince(user.joinDate)[2]} Month(s)`}</Badge>
        </Box>
      </div>
    </div>
  );
};

export default Profile;

const Box = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col items-center justify-center border-2 border-white bg-emerald-50 py-2 rounded-lg">{children}</div>;
};

import { calculateYearsSince } from "@/utils";
import { Badge } from "../ui/badge";

const Profile = ({ user }: any) => {
  return (
    <div className="p-4 border-2 border-white flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <div className="grid grid-cols-4 gap-4">
        <Box>
          <div>NIK</div>
          <Badge className="bg-emerald-500">{user.nik}</Badge>
        </Box>
        <Box>
          <div>Employee Type</div>
          <Badge className="bg-emerald-500">{user.empTypeGroup}</Badge>
        </Box>
        <Box>
          <div>Job Title</div>
          <Badge className="bg-emerald-500">{user.jobTtlName}</Badge>
        </Box>
        <Box>
          <div>Department</div>
          <Badge className="bg-emerald-500">{user.deptName}</Badge>
        </Box>
        <Box>
          <div>Location</div>
          <Badge className="bg-emerald-500">{user.locationName}</Badge>
        </Box>
        <Box>
          <div>Employee Date</div>
          <Badge className="bg-emerald-500">
            {`${calculateYearsSince(user.joinDate)[0]} | ${calculateYearsSince(user.joinDate)[1]} Year(s), ${calculateYearsSince(user.joinDate)[2]} Month(s)`}
          </Badge>
        </Box>
      </div>
    </div>
  );
};

export default Profile;

const Box = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col items-center justify-center border-2 border-white bg-emerald-50 py-2 rounded-lg">{children}</div>;
};

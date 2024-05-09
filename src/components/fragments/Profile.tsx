import { calculateYearsSince } from "@/utils";
import { Badge } from "../ui/badge";

const Profile = ({ profile }: any) => {
  return (
    <div className="p-4 border-2 border-white flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{profile.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Box>
          <div>NIK</div>
          <Badge>{profile.nik}</Badge>
        </Box>
        <Box>
          <div>Employee Type</div>
          <Badge>{profile.empTypeGroup}</Badge>
        </Box>
        <Box>
          <div>Job Title</div>
          <Badge>{profile.jobTtlName}</Badge>
        </Box>
        <Box>
          <div>Department</div>
          <Badge>{profile.deptName}</Badge>
        </Box>
        <Box>
          <div>Location</div>
          <Badge>{profile.locationName}</Badge>
        </Box>
        <Box>
          <div>Employee Date</div>
          <Badge>{`${calculateYearsSince(profile.joinDate)[0]} | ${calculateYearsSince(profile.joinDate)[1]} Year(s), ${calculateYearsSince(profile.joinDate)[2]} Month(s)`}</Badge>
        </Box>
      </div>
    </div>
  );
};

export default Profile;

const Box = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col items-center justify-center border-2 border-white bg-emerald-50 py-2 rounded-lg">{children}</div>;
};

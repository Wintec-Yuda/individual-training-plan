import { Button } from "@/components/ui/button";
const ButtonProcessingCourses = ({ isCourses, setIsCourses }: { isCourses: string; setIsCourses: any }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
      {["register", "submit", "submitted", "realization"].map((type: string) => (
        <Button key={type} onClick={() => setIsCourses(type)} className={`${isCourses === type ? "bg-blue-600" : "bg-white text-black border border-black"} hover:bg-blue-600`}>
          {type === "register" ? "Courses List" : type === "submit" ? "Registered Courses" : type === "submitted" ? "Submitted Courses" : "Realization Courses"}
        </Button>
      ))}
    </div>
  );
};

export default ButtonProcessingCourses;

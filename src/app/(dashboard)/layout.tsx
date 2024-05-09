import Navbar from "@/components/fragments/Navbar";
import { greeting } from "@/utils";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <section className="flex flex-col">
      <aside className="fixed w-12 sm:w-48 h-screen backdrop-blur flex flex-col items-center justify-center sm:justify-normal gap-8 p-2">
        <div className="hidden sm:flex h-20 w-20 rounded-full bg-emerald-100 shadow shadow-emerald-100"></div>
        <Navbar />
      </aside>
      <main className="overflow-hidden bg-branch">
        <div className="w-[calc(100vw-3rem)] sm:w-[calc(100vw-12rem)] relative left-12 sm:left-48 bg-emerald-100 p-4 min-h-screen">
          <header className="flex flex-col mb-2">
            <h1 className="text-xl md:text-2xl xl:text-3xl font-bold">{greeting()}, YANUARTI ARIF WIJAYA</h1>
            <h3 className="text-sm md:text-base font-semibold underline">Local Procurement Supervisor</h3>
          </header>
          {children}
        </div>
      </main>
    </section>
  );
};

export default DashboardLayout;

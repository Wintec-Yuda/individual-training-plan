import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-full bg-emerald-100 flex flex-col gap-4 justify-center items-center">
      <h1 className="text-3xl font-bold underline">Individual Training Plan</h1>
      <Link href="/auth/login" className="w-96">
        <Button className="w-full">Login</Button>
      </Link>
    </main>
  );
}

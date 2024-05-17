import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-4 w-full bg-emerald-200 flex flex-col gap-6 justify-center items-center">
      <h1 className="text-3xl font-bold underline">Individual Training Plan</h1>
      <div className="grid lg:grid-cols-2 gap-10 md:w-3/4">
        <div className="bg-emerald-100/50 border border-emerald-500 p-4 shadow-md shadow-emerald-500">
          <p className="text-justify">
            Website ini merupakan platform untuk mengelola proses pendaftaran pelatihan bagi pengguna dan tim, dalam studi kasus di PT Kalbe Farma saat saya sedang menjalani magang. Proses utamanya adalah pada hierarki persetujuan yang
            memungkinkan persetujuan pendaftaran melalui beberapa tahap persetujuan dari manajer atau supervisor yang ditentukan. Website ini dikembangkan untuk memfasilitasi transisi dari proses manual ke proses digital.
          </p>
        </div>
        <div className="bg-emerald-100/50 border border-emerald-500 p-4 shadow-md shadow-emerald-500">
          <p className="text-justify">Platform ini melibatkan beberapa pengguna, untuk mencoba login dengan SAM Account Name sebagai berikut:</p>
          <ul className="list-disc">
            <li className="ms-4">Supervisor: yanuarti</li>
            <li className="ms-4">Manager (approval 1): komang</li>
            <li className="ms-4">Manager (approval 2): leonardo</li>
            <li className="ms-4">Manager (approval 3): yulita</li>
            <li className="ms-4">Manager (approval 4 golongan 4-5): leonardo</li>
            <li className="ms-4">Supervisor dan admin (approval 4 golongan 1-3): adriella</li>
          </ul>
        </div>
      </div>
      <Link href="/auth/login" className="w-96">
        <Button className="w-full">Login</Button>
      </Link>
    </main>
  );
}

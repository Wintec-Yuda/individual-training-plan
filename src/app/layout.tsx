import { Inter } from "next/font/google";
import "./globals.css";
import ProviderLayout from "@/components/templates/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Individual Training Plan",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderLayout>{children}</ProviderLayout>
      </body>
    </html>
  );
}

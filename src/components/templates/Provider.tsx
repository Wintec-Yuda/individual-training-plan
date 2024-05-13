"use client";

import { Provider } from "react-redux";
import store from "@/store";
import { SessionProvider } from "next-auth/react";

const ProviderLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
};

export default ProviderLayout;

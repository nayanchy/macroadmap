import GlobalNav from "@/components/Navbar/GlobalNav";
import PageLoader from "@/components/PageLoader";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <GlobalNav />

      <main className="background-light850_dark100 px-4 sm:px-30">
        <div className="mt-4">{children}</div>
        <PageLoader />
      </main>
    </div>
  );
};

export default RootLayout;

import GlobalNav from "@/components/Navbar/GlobalNav";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <GlobalNav />

      <main className="background-light850_dark100 px-4 sm:px-30">
        <div className="mt-4">{children}</div>
      </main>
    </div>
  );
};

export default RootLayout;

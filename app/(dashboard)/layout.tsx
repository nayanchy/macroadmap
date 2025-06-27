// import GlobalNav from "@/components/Navbar/GlobalNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <GlobalNav /> */}
      <SidebarProvider>
        <main className="background-light850_dark100 px-4 sm:px-30">
          <div className="mt-4">{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;

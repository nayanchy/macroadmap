import Dashboard from "@/components/Dashboard/Dashboard";
import PageLoader from "@/components/PageLoader";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";

const DashboardPage = () => {
  return (
    <div>
      <Suspense fallback={<PageLoader />}>
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default DashboardPage;

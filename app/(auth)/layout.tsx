import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative min-h[100vh] px-4 sm:px-30">
      {children}
    </main>
  );
};

export default AuthLayout;

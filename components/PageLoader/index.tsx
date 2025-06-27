"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PageLoader = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleStart = () => setLoading(true);

    // Listen for browser navigation events
    const handleBeforeUnload = () => handleStart();
    const handlePopState = () => handleStart();

    // Override Link clicks
    const handleLinkClick = (e) => {
      const target = e.target.closest("a");
      if (
        target &&
        target.href &&
        !target.href.startsWith("mailto:") &&
        !target.href.startsWith("tel:")
      ) {
        const url = new URL(target.href);
        // Only show loader for internal navigation
        if (
          url.origin === window.location.origin &&
          url.pathname !== pathname
        ) {
          handleStart();
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleLinkClick);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleLinkClick);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-black/80">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner using your custom colors */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

const PageLoader = () => {
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMounted = useRef(true);

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    isMounted.current = true;

    const handleStart = () => {
      // Use startTransition to mark this as a non-urgent update
      startTransition(() => {
        if (isMounted.current) {
          setLoading(true);
        }
      });
    };

    // Listen for browser navigation events
    const handleBeforeUnload = () => handleStart();
    const handlePopState = () => handleStart();

    // Override Link clicks
    const handleLinkClick = (e: MouseEvent | Event) => {
      const target = (e.target as HTMLElement).closest("a");
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

    // Handle form submissions (for OAuth buttons that might be forms)
    const handleFormSubmit = (e: SubmitEvent) => {
      if (!e.target || !(e.target instanceof Element)) return;

      const form = e.target.closest("form");
      if (form) {
        // Check if this is likely an OAuth form
        const action = form.action || form.getAttribute("action");
        if (action && (action.includes("oauth") || action.includes("auth"))) {
          handleStart();
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleLinkClick);
    document.addEventListener("submit", handleFormSubmit);

    return () => {
      isMounted.current = false;
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleLinkClick);
      document.removeEventListener("submit", handleFormSubmit);
    };
  }, [pathname]);

  if (!loading && !isPending) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-black/80">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;

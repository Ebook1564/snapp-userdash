"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function HomePage() {
  const { clientEmail, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (clientEmail) {
      router.push("/overview");
    } else {
      // Redirect to login page
      router.push("/signin");
    }
  }, [router, clientEmail, isLoading]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Redirecting to login...</p>
      </div>
    </div>
  );
}


"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import Button from "@/components/ui/button/Button";

export default function AccountInfoPage() {
  const { clientName, clientEmail } = useUser();
  const [userProfile, setUserProfile] = useState<{
    id?: number | string | null;
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
    useremail?: string | null;
    phone?: string | null;
    phonenumber?: string | null;
    country_code?: string | null;
    country_name?: string | null;
    country?: string | null;
    account_type?: string | null;
    account_id?: string | null;
    contracting_entity?: string | null;
    [key: string]: any;
  }>({});
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);

  // Fetch profile from API when clientEmail is available
  useEffect(() => {
    const fetchProfile = async () => {
      if (!clientEmail) return;

      setIsLoadingProfile(true);
      setProfileError(null);
      try {
        // include debug flag in dev so server returns rawRow for diagnostics
        const res = await fetch("/api/user/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: clientEmail, debug: true }),
        });

        const data = await res.json();
        if (!res.ok) {
          console.error("Failed to fetch profile:", data);
          setProfileError(data?.error || "Failed to fetch profile");
          return;
        }

  // merge mapped user + rawRow so username (or other raw fields) are available client-side
  const merged = { ...(data.user || {}), ...(data.rawRow || {}) };
  setUserProfile(merged);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setProfileError((err as Error).message || "Error fetching profile");
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [clientEmail]);

  // Only show the requested personal information fields
  const personalFields = [
    { label: "First Name", value: (userProfile as any).username || (userProfile as any).user_name || userProfile.first_name || clientName || "-" },
  { label: "Email address", value: (userProfile as any).useremail || userProfile.email || clientEmail || "-" },
    {
      label: "Phone",
      value:
        (userProfile.country_code ? `${userProfile.country_code} ` : "") + (userProfile.phone || "-"),
    },
    { label: "Country Code", value: userProfile.country_code || "-" },
    { label: "Country", value: userProfile.country_name || "-" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
            Account Info
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage your account information.
          </p>
        </div>
      </div>

      {/* Account Details Section (new layout matching requested design) */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white/90">Account Info</h2>

        <div className="rounded-xl border border-gray-200 bg-white px-6 py-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="space-y-4">
            {/* Row: Account Name */}
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Account Name</div>
              <div className="text-sm text-gray-900 dark:text-white/90">{(userProfile.username || userProfile.user_name || userProfile.first_name) || clientName || (userProfile as any).useremail || clientEmail || "-"}</div>
            </div>

            {/* Row: Account Type */}
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Account Type</div>
              <div className="text-sm text-gray-900 dark:text-white/90">{(userProfile as any).account_type || "Business"}</div>
            </div>

            {/* Row: Account ID / Parent ID (same value) */}
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Account ID / Parent ID</div>
              <div className="text-sm text-gray-900 dark:text-white/90">{userProfile.id ?? (userProfile as any).account_id ?? clientEmail ?? "-"}</div>
            </div>

            {/* Row: Domicile */}
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Domicile</div>
              <div className="text-sm text-gray-900 dark:text-white/90">{userProfile.country_name || userProfile.country || "-"}</div>
            </div>

            {/* Row: Contracting Entity */}
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Contracting Entity</div>
              <div className="text-sm text-gray-900 dark:text-white/90">{(userProfile as any).contracting_entity || "Demo Company Inc. | US"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white/90">
            Property Details
          </h2>
          <Button
            variant="outline"
            onClick={() => setIsPropertyModalOpen(true)}
            className="w-full sm:w-auto"
          >
            SELECT PROPERTY
          </Button>
        </div>
        {selectedProperty && (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-sm text-gray-900 dark:text-white/90">
              Selected: <span className="font-semibold">{selectedProperty}</span>
            </p>
          </div>
        )}
      </div>

      {/* Property Selection Modal */}
      {isPropertyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white/90">
              Select Property
            </h3>
            <div className="space-y-2 mb-4">
              {/* Mock property options - in real app, fetch from API */}
              {["Property 1", "Property 2", "Property 3"].map((property) => (
                <button
                  key={property}
                  onClick={() => {
                    setSelectedProperty(property);
                    setIsPropertyModalOpen(false);
                  }}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {property}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setIsPropertyModalOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}


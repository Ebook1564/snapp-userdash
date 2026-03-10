"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

type UserContextType = {
  clientName: string;
  setClientName: (name: string) => void;
  clientEmail: string | null;
  setClientEmail: (email: string | null) => void;
  clientCountry: string | null;
  setClientCountry: (country: string | null) => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Default client name - can be changed dynamically
  // You can also initialize this from localStorage, API, or environment variables
  const [clientName, setClientName] = useState<string>("Client Name");
  const [clientEmail, setClientEmail] = useState<string | null>(null);
  const [clientCountry, setClientCountry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from cookies on component mount (client-side)
  useEffect(() => {
    const savedName = Cookies.get("clientName");
    const savedEmail = Cookies.get("clientEmail");
    const savedCountry = Cookies.get("clientCountry");
    if (savedName) setClientName(savedName);
    if (savedEmail) setClientEmail(savedEmail);
    if (savedCountry) setClientCountry(savedCountry);
    setIsLoading(false);
  }, []);

  // Fetch profile to get country if not already set or whenever email changes
  useEffect(() => {
    const fetchProfile = async () => {
      if (!clientEmail) return;

      try {
        const res = await fetch("/api/user/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: clientEmail }),
        });

        const data = await res.json();
        if (res.ok && data.user) {
          const country = data.user.country_name || data.user.country;
          if (country && country !== clientCountry) {
            updateClientCountry(country);
          }
        }
      } catch (err) {
        console.error("[UserContext] Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, [clientEmail]);

  const updateClientName = (name: string) => {
    setClientName(name);
    // Set cookie that expires in 7 days
    Cookies.set("clientName", name, { expires: 7 });
  };

  const updateClientEmail = (email: string | null) => {
    setClientEmail(email);
    if (email === null) {
      Cookies.remove("clientEmail");
      Cookies.remove("clientName"); // Also clear name on logout/clear email
      Cookies.remove("clientCountry");
    } else {
      Cookies.set("clientEmail", email, { expires: 7 });
    }
  };

  const updateClientCountry = (country: string | null) => {
    console.log("[UserContext] Updating clientCountry to:", country);
    setClientCountry(country);
    if (country === null) {
      Cookies.remove("clientCountry");
    } else {
      Cookies.set("clientCountry", country, { expires: 7 });
    }
  };

  return (
    <UserContext.Provider
      value={{
        clientName,
        setClientName: updateClientName,
        clientEmail,
        setClientEmail: updateClientEmail,
        clientCountry,
        setClientCountry: updateClientCountry,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


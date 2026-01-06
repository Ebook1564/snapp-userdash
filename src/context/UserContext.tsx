"use client";
import React, { createContext, useContext, useState } from "react";

type UserContextType = {
  clientName: string;
  setClientName: (name: string) => void;
  clientEmail: string | null;
  setClientEmail: (email: string | null) => void;
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
  const [clientName, setClientName] = useState<string>(
    typeof window !== "undefined"
      ? localStorage.getItem("clientName") || "Client Name"
      : "Client Name"
  );

  const [clientEmail, setClientEmail] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("clientEmail") : null
  );

  const updateClientName = (name: string) => {
    setClientName(name);
    if (typeof window !== "undefined") {
      localStorage.setItem("clientName", name);
    }
  };

  const updateClientEmail = (email: string | null) => {
    setClientEmail(email);
    if (typeof window !== "undefined") {
      if (email === null) localStorage.removeItem("clientEmail");
      else localStorage.setItem("clientEmail", email);
    }
  };

  return (
    <UserContext.Provider
      value={{
        clientName,
        setClientName: updateClientName,
        clientEmail,
        setClientEmail: updateClientEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

const UserRoleContext = createContext({
  role: "",
  setRole: (role: string) => {},
});

export const useUserRole = () => useContext(UserRoleContext);

export default function RoleContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState("");
  const value = useMemo(() => ({ role, setRole }), [role, setRole]);

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
}

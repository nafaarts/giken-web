"use client";

import React from "react";

import LoadingScreen from "@/Component/LoadingScreen";
import NavigationBar from "@/Component/Navbar";
import { useSession } from "next-auth/react";
import { Container } from "react-bootstrap";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession();

  if (session.status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <div>
      <NavigationBar />
      <Container className="py-3">{children}</Container>
    </div>
  );
}

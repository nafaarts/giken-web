import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

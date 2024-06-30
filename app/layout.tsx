import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionWrapper from "@/Component/SessionWrapper";
import "./app.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PT Giken Precision Indonesia",
  description:
    "PT Giken Precision Indonesia sendiri merupakan perusahaan yang bergerak dibidang elektronik manufaktur",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={inter.className}
          style={{
            backgroundColor: "#eee",
          }}
        >
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}

"use client";

import { Button } from "react-bootstrap";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ShipmentAddButton() {
  const session = useSession();

  if (session?.data?.user?.name !== "PC") {
    return null;
  }

  return (
    <Link href="/shipment/create">
      <Button size="sm">Buat Shipment</Button>
    </Link>
  );
}

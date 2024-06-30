import { getShipmentById } from "@/action/shipment";
import ShipmentDetail from "../_component/shipment-detail";
import Link from "next/link";
import { Button } from "react-bootstrap";
import ShipmentAction from "../_component/shipment-action";
import ShipmentSendNotification from "../_component/shipment-send-notification";
import { getDrivers } from "@/action/user";

export default async function page({
  params,
}: {
  params: {
    uid: string;
  };
}) {
  const shipment = await getShipmentById(params.uid);
  const drivers = await getDrivers();

  if (!shipment) {
    return (
      <>
        <p>Tidak ada data!</p>
        <Link href="/shipment">Kembali</Link>
      </>
    );
  }

  return (
    <div>
      <ShipmentDetail shipment={shipment} />
      <div className="d-flex justify-content-between align-items-center">
        <Link href="/shipment">
          <Button variant="secondary">Kembali</Button>
        </Link>

        <ShipmentAction shipment={shipment} />
        <ShipmentSendNotification shipment={shipment} drivers={drivers} />
      </div>
    </div>
  );
}

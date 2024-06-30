import { getShipmentById } from "@/action/shipment";
import ShipmentEditForm from "../../_component/shipment-edit";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: {
    uid: string;
  };
}) {
  const shipment = await getShipmentById(params.uid);

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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Edit Shipment</h5>
      </div>
      <ShipmentEditForm shipment={shipment} />
    </div>
  );
}

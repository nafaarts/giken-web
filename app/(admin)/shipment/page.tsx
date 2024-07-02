import { getShipments } from "@/action/shipment";
import ShipmentTable from "./_component/shipment-table";
import ShipmentAddButton from "./_component/shipment-add-button";

export const metadata = {
  title: "Shipment  - PT Giken Precision Indonesia",
};

export default async function page() {
  const shipments = await getShipments();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Data Shipment</h5>
        <ShipmentAddButton />
      </div>
      <ShipmentTable shipments={shipments} />
    </div>
  );
}

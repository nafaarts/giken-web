import ShipmentAddForm from "../_component/shipment-add";

export const metadata = {
  title: "Buat Shipment - PT Giken Precision Indonesia",
};

export default async function page() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Tambah Shipment</h5>
      </div>
      <ShipmentAddForm />
    </div>
  );
}

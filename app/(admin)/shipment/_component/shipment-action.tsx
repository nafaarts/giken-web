"use client";

import { deleteShipment } from "@/action/shipment";
import { Shipment } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

export default function ShipmentAction({ shipment }: { shipment: Shipment }) {
  const { data } = useSession();
  const currentUser = data?.user;

  const router = useRouter();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (shipment) {
        const uid = shipment.uid as string;

        await deleteShipment(uid);

        alert("Shipment berhasil dihapus");
      }

      router.push("/shipment");
    } catch (error) {
      console.log(error);

      alert(error);
    }

    handleClose();
    setLoading(false);
  };

  if (currentUser?.name !== "PC") {
    return null;
  }

  return (
    <div className="d-flex gap-2">
      <Link href={`/shipment/${shipment.uid}/edit`}>
        <Button size="sm" variant="warning">
          Edit
        </Button>
      </Link>
      <Button size="sm" variant="danger" onClick={handleShow}>
        Hapus
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah anda yakin untuk menghapus shipment ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            Ya, Hapus
            {loading && (
              <Spinner animation="border" size="sm" className="ms-2">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

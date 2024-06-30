"use client";

import { updateShipment } from "@/action/shipment";
import { Shipment } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

export default function ShipmentApproval({
  shipment,
  role,
}: {
  shipment: Shipment;
  role: string;
}) {
  const { data } = useSession();
  const router = useRouter();
  const currentUser = data?.user;

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (shipment) {
        const uid = shipment.uid as string;

        await updateShipment(uid, {
          approval: {
            [role.toLocaleLowerCase()]: {
              approved_by: currentUser?.email,
              status: true,
            },
          },
        });
      }

      router.refresh();
    } catch (error) {
      console.log(error);

      alert(error);
    }

    handleClose();
    setLoading(false);
  };

  return (
    <>
      <Button
        size="sm"
        variant="success"
        onClick={handleShow}
        disabled={role !== currentUser?.name}
      >
        Approve
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah anda yakin untuk menyetujui shipment ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            Ya, Konfirmasi
            {loading && (
              <Spinner animation="border" size="sm" className="ms-2">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

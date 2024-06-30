"use client";

import { Driver, Shipment } from "@/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { sendNotification } from "@/action/user";

export default function ShipmentSendNotification({
  shipment,
  drivers,
}: {
  shipment: Shipment;
  drivers: Driver[];
}) {
  const { data } = useSession();

  const currentUser = data?.user;

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [driver, setDriver] = useState<string>("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const uid = shipment.uid as string;

      await sendNotification(driver, uid);
    } catch (error) {
      console.log(error);
      alert(error);
    }
    handleClose();
    setLoading(false);
  };

  return (
    <>
      <Button onClick={handleShow} disabled={currentUser?.name !== "APPROVAL"}>
        Kirim Notifikasi
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Kirim Notifikasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Driver</Form.Label>
            <Form.Select onChange={(e) => setDriver(e.target.value)}>
              <option>pilih driver</option>
              {drivers.map((driver, i) => (
                <option key={i} value={driver.notification_token}>
                  {driver.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            Kirim
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

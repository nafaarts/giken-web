"use client";

import { createShipment } from "@/action/shipment";
import { Lots, Shipment } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";

export default function ShipmentAddForm() {
  const { data } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  // fields
  const [date, setDate] = useState<string>("");
  const [refNumber, setRefNumber] = useState<string>("");
  const [partName, setPartName] = useState<string>("");
  const [partNumber, setPartNumber] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");

  const [lots, setLots] = useState<Lots[]>([]);

  const handleAddLot = (e: SyntheticEvent) => {
    e.preventDefault();
    const data = e.currentTarget as HTMLFormElement;

    if (data["product"].value && data["quantity"].value) {
      const newLot: Lots = {
        pd: data["product"].value,
        qty: parseInt(data["quantity"].value),
      };

      setLots([...lots, newLot]);

      // reset form
      data.reset();
    }
  };

  const handleDeleteLot = (lot: Lots) => {
    const newLots = lots.filter((item) => item !== lot);
    setLots(newLots);
  };

  const isFieldsEmpty = () => {
    if (
      date === "" ||
      refNumber === "" ||
      partName === "" ||
      partNumber === "" ||
      remarks === "" ||
      lots.length === 0
    ) {
      return true;
    }

    return false;
  };

  const handleAddShipment = async () => {
    if (isFieldsEmpty()) {
      alert("Semua field harus diisi!");
      return;
    }

    const shipment: Shipment = {
      date,
      ref_number: refNumber,
      part_name: partName,
      part_number: partNumber,
      remarks,
      lots,
      approval: {
        pc: {
          status: true,
          approved_by: data?.user?.email as string,
        },
      },
    };

    try {
      setLoading(true);
      const addShipment = await createShipment(shipment);

      if (addShipment) {
        alert("Shipment berhasil ditambahkan");
        router.push("/shipment/" + addShipment);
      }
    } catch (error) {
      console.log(error);
      alert("Terjadi kesalahan saat menambahkan shipment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card className="mb-3">
        <Card.Body>
          <h6 className="mb-3">Data Shipment</h6>

          <Form onSubmit={handleAddShipment}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Masukkan Tanggal"
                    defaultValue={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Ref Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Ref Number"
                    defaultValue={refNumber}
                    onChange={(e) => setRefNumber(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Part Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Part Name"
                    defaultValue={partName}
                    onChange={(e) => setPartName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Part Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Part Number"
                    defaultValue={partNumber}
                    onChange={(e) => setPartNumber(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Masukan Remarks"
                defaultValue={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h6 className="mb-3">Data Lot</h6>
          <Row className="g-3 mb-3">
            {lots.map((lot, index) => (
              <Col xs={6} md={3} key={index.toString()}>
                <Card className="p-2">
                  <h6>{lot.pd}</h6>
                  <small className="text-muted">Qty: {lot.qty}</small>
                  <hr />
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      handleDeleteLot(lot);
                    }}
                  >
                    Hapus
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
          {lots.length > 0 && <hr />}
          <Form onSubmit={handleAddLot}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Product</Form.Label>
                  <Form.Control
                    type="text"
                    name="product"
                    placeholder="Masukkan Product"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    placeholder="Masukkan Quantity"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end gap-2">
              <Button size="sm" type="submit" disabled={loading}>
                Tambah Lot
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <div className="d-flex justify-content-end gap-2">
            <Link href="/shipment">
              <Button variant="secondary">Batal</Button>
            </Link>
            <Button onClick={handleAddShipment} disabled={loading}>
              Simpan
              {loading && (
                <Spinner animation="border" size="sm" className="ms-2">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

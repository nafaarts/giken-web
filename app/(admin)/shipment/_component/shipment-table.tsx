"use client";

import Table from "react-bootstrap/Table";
import { Shipment } from "@/types";
import Link from "next/link";
import { Button } from "react-bootstrap";

function ShipmentTable({ shipments }: { shipments: Shipment[] | undefined }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Tanggal</th>
          <th>Ref No</th>
          <th>Part Name</th>
          <th>Part Number</th>
          <th>Total Lots</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {shipments?.length ? (
          shipments?.map((shipment, index) => {
            return (
              <tr
                key={shipment.uid}
                style={{
                  verticalAlign: "middle",
                  whiteSpace: "nowrap",
                }}
              >
                <td>{index + 1}</td>
                <td>{shipment.date}</td>
                <td>
                  <Link href={`/shipment/${shipment.uid}`}>
                    {shipment.ref_number}
                  </Link>
                </td>
                <td>{shipment.part_name}</td>
                <td>{shipment.part_number}</td>
                <td>{shipment.lots?.length}</td>
                <td>
                  {shipment.delivery?.status ? (
                    <span className="badge bg-success">Sudah dikirim</span>
                  ) : (
                    <span className="badge bg-warning">Belum dikirim</span>
                  )}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Link href={`/shipment/${shipment.uid}`}>
                      <Button size="sm">Lihat</Button>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={8} className="text-center">
              Tidak ada data
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default ShipmentTable;

import { Shipment } from "@/types";
import { Badge } from "react-bootstrap";
import ShipmentApproval from "./shipment-approval";

export default async function ShipmentDetail({
  shipment,
}: {
  shipment: Shipment;
}) {
  const totalQuantity = shipment?.lots?.reduce(
    (acc, lot) => acc + (lot.qty || 0),
    0
  );

  const lots = shipment?.lots || [];
  const lotGroups = [];
  for (let i = 0; i < lots.length; i += 6) {
    lotGroups.push(lots.slice(i, i + 6));

    if (lotGroups[lotGroups.length - 1].length < 6) {
      const emptyCount = 6 - lotGroups[lotGroups.length - 1].length;
      for (let j = 0; j < emptyCount; j++) {
        lotGroups[lotGroups.length - 1].push({
          pd: null,
          qty: null,
        });
      }
    }
  }

  return (
    <div>
      <table
        className="table table-bordered"
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr
            style={{
              verticalAlign: "middle",
            }}
          >
            <th colSpan={2}>
              DATE: <strong>{shipment.date}</strong>
            </th>
            <th colSpan={14} className="text-center">
              SHIPMENT REQUEST FORM
            </th>
            <th colSpan={2} className="text-end">
              Ref No: <strong>{shipment.ref_number}</strong>
            </th>
          </tr>
          <tr
            style={{
              verticalAlign: "middle",
            }}
          >
            <th rowSpan={2}>No</th>
            <th rowSpan={2}>Part Name</th>
            <th rowSpan={2}>Part No</th>
            <th rowSpan={2}>Qty Request</th>
            <th colSpan={12} className="text-center">
              Lot No.
            </th>
            <th rowSpan={2}>Total Box</th>
            <th rowSpan={2}>Total Qty</th>
          </tr>
          <tr>
            <th>PD 1</th>
            <th>QTY</th>
            <th>PD 2</th>
            <th>QTY</th>
            <th>PD 3</th>
            <th>QTY</th>
            <th>PD 4</th>
            <th>QTY</th>
            <th>PD 5</th>
            <th>QTY</th>
            <th>PD 6</th>
            <th>QTY</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style={{
              verticalAlign: "middle",
            }}
          >
            <td rowSpan={lotGroups.length}>1</td>
            <td rowSpan={lotGroups.length}>{shipment.part_name}</td>
            <td rowSpan={lotGroups.length}>{shipment.part_number}</td>
            <td rowSpan={lotGroups.length}>-</td>
            {lotGroups[0].map((lot, i) => {
              return (
                <>
                  <td key={i}>{lot.pd}</td>
                  <td key={lot.pd}>{lot.qty}</td>
                </>
              );
            })}
            <td rowSpan={lotGroups.length}>{shipment?.lots?.length}</td>
            <td rowSpan={lotGroups.length}>{totalQuantity}</td>
          </tr>
          {lotGroups.slice(1).map((group, i) => {
            return (
              <tr key={i}>
                {group.map((lot, j) => {
                  return (
                    <>
                      <td key={j}>{lot.pd}</td>
                      <td key={lot.pd}>{lot.qty}</td>
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <table
        className="table table-bordered"
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <td
              colSpan={14}
              rowSpan={3}
              style={{
                width: "60%",
              }}
            >
              <strong>Remarks:</strong>
              <p>{shipment.remarks}</p>
            </td>
            <th>Delivery Date</th>
            <td colSpan={3}>{shipment?.delivery?.date ?? "-"}</td>
          </tr>
          <tr>
            <th style={{ width: "10%" }}>PC</th>
            <th style={{ width: "10%" }}>Store</th>
            <th style={{ width: "10%" }}>QC</th>
            <th style={{ width: "10%" }}>Approved</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={14} rowSpan={2}></td>
            <td>
              {shipment?.approval?.pc?.status ? (
                <Badge bg="success">Y</Badge>
              ) : (
                <ShipmentApproval shipment={shipment} role="PC" />
              )}
            </td>
            <td>
              {shipment?.approval?.store?.status ? (
                <Badge bg="success">Y</Badge>
              ) : (
                <ShipmentApproval shipment={shipment} role="STORE" />
              )}
            </td>
            <td>
              {shipment?.approval?.qc?.status ? (
                <Badge bg="success">Y</Badge>
              ) : (
                <ShipmentApproval shipment={shipment} role="QC" />
              )}
            </td>
            <td>
              {shipment?.approval?.approval?.status ? (
                <Badge bg="success">Y</Badge>
              ) : (
                <ShipmentApproval shipment={shipment} role="APPROVAL" />
              )}
            </td>
          </tr>
          <tr>
            <td
              style={{
                fontSize: 10,
              }}
            >
              {shipment?.approval?.pc?.approved_by ?? "-"}
            </td>
            <td
              style={{
                fontSize: 10,
              }}
            >
              {shipment?.approval?.store?.approved_by ?? "-"}
            </td>
            <td
              style={{
                fontSize: 10,
              }}
            >
              {shipment?.approval?.qc?.approved_by ?? "-"}
            </td>
            <td
              style={{
                fontSize: 10,
              }}
            >
              {shipment?.approval?.approval?.approved_by ?? "-"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

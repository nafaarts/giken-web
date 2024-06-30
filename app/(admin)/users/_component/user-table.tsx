"use client";

import Table from "react-bootstrap/Table";
import DeleteUser from "./user-delete";
import EditUser from "./user-edit";
import { User } from "@/types";

function UserTable({ users }: { users: User[] | undefined }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Nama</th>
          <th>Email</th>
          <th>Role</th>
          <th>Terakhir Login</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {users?.length ? (
          users?.map((user, index) => {
            return (
              <tr
                key={user.uid}
                style={{
                  verticalAlign: "middle",
                  whiteSpace: "nowrap",
                }}
              >
                <td>{index + 1}</td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.lastSignInTime}</td>
                <td>
                  <div className="d-flex gap-2">
                    <EditUser user={user} />
                    <DeleteUser user={user} />
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={6} className="text-center">
              Tidak ada data
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default UserTable;

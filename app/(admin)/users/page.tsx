import { initAdmin } from "@/utils/firebase-admin";
import UserTable from "./_component/user-table";

import AddUser from "./_component/user-add";
import { getAllUsers } from "@/action/user";

export const metadata = {
  title: "Users - PT Giken Precision Indonesia",
};

export default async function page() {
  await initAdmin();
  const users = await getAllUsers();

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Data User</h5>
        <AddUser />
      </div>
      <UserTable users={users} />
    </>
  );
}

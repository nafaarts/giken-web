"use client";

import { SyntheticEvent, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/navigation";
import { Spinner } from "react-bootstrap";
import { deleteUser } from "@/action/user";
import { User } from "@/types";
import { useSession } from "next-auth/react";

function DeleteUser({ user }: { user: User }) {
  const router = useRouter();
  const { data } = useSession();
  const currentUser = data?.user;

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await deleteUser(user.uid);

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
        variant="danger"
        onClick={handleShow}
        disabled={user.email === currentUser?.email}
      >
        Hapus
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah anda yakin ingin menghapus user{" "}
          <strong>{user.displayName}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            Simpan
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

export default DeleteUser;

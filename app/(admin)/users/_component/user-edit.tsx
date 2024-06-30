"use client";

import { SyntheticEvent, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/navigation";
import { Spinner } from "react-bootstrap";
import { updateUser } from "@/action/user";
import { User } from "@/types";

function EditUser({ user }: { user: User }) {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [name, setName] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(user.role || "");

  const isFieldEmpty = () => {
    return !name || !email || !role;
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isFieldEmpty()) {
      alert("Field tidak boleh kosong");
      return;
    }

    try {
      await updateUser(user.uid, {
        email,
        password,
        name,
        role,
      });

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
      <Button size="sm" variant="warning" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit data user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukan Nama"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Masukan Email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              defaultValue={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Pilih role akses</option>
              <option value="PC">PC</option>
              <option value="STORE">STORE</option>
              <option value="QC">QC</option>
              <option value="APPROVAL">APPROVAL</option>
              <option value="DRIVER">DRIVER</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Masukan Password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isFieldEmpty() || loading}
          >
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

export default EditUser;

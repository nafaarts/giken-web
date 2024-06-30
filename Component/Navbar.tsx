"use client";

import Image from "next/image";
import Logo from "@/public/logo.webp";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSession } from "next-auth/react";
import { doLogout } from "@/action/user";
import { Spinner } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";

function NavigationBar() {
  const session = useSession();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await doLogout();
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Image src={Logo} alt="Logo" height={30} priority={true} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as="div">
                <Link
                  className="text-dark text-decoration-none"
                  href="/shipment"
                >
                  Shipment
                </Link>
              </Nav.Link>
              <Nav.Link as="div">
                <Link className="text-dark text-decoration-none" href="/users">
                  Users
                </Link>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                {session?.data?.user?.email} ({session?.data?.user?.name})
              </Nav.Link>
              <Nav.Link onClick={handleShow}>Keluar</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah anda yakin ingin keluar?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tidak
          </Button>
          <Button variant="primary" onClick={handleLogout} disabled={loading}>
            Keluar
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

export default NavigationBar;

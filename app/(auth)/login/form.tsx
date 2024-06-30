"use client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { doCredentialLogin } from "@/action/user";
import { Spinner } from "react-bootstrap";

export default function LoginForm() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await doCredentialLogin(formData);
      if (response) {
        window.location.href = "/shipment";
      }
    } catch (e) {
      console.error("Error nih:", e);
      setError("Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Alamat Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Masukan email" />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Kata Sandi</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="********"
          />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={loading}>
          Masuk
          {loading && (
            <Spinner animation="border" size="sm" className="ms-2">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Button>
      </Form>
    </div>
  );
}

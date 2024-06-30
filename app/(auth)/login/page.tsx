import { Card } from "react-bootstrap";
import LoginForm from "./form";
import Image from "next/image";
import Logo from "@/public/logo.webp";

export default function page() {
  return (
    <Card
      className="m-3 m-md-0 p-4"
      style={{
        maxWidth: "500px",
        width: "100%",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h4>Login</h4>
          <small className="text-muted">Masuk ke akun anda</small>
        </div>
        <Image src={Logo} height={50} alt="Logo" priority />
      </div>
      <hr />
      <LoginForm />
    </Card>
  );
}

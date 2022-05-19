import React from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/user";
import { setSession } from "../auth";

export default function Signin() {
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const data = await loginUser({
      email: email.value,
      password: password.value,
    });

    setSession(data.data, data.meta.token);
    navigate("/tasks");
  }

  return (
    <>
      <h2 className="formulario">Inicio de Sesion</h2>
      <Form onSubmit={login}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            name="password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Iniciar Sesion
        </Button>
      </Form>
    </>
  );
}

import React, { Suspense } from "react";
import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import { Route, Routes, Link } from "react-router-dom";
import { isAuthenticated, getSession, clearSession } from "./auth";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Register = React.lazy(() => import("./pages/register"));
const Signin = React.lazy(() => import("./pages/signin"));
const ListTask = React.lazy(() => import("./pages/list"));

export default function App() {
  const navigate = useNavigate();
  function logout() {
    clearSession();
    navigate("/");
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Link to="/" className="navbar-brand">
            Things
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isAuthenticated() && (
                <Link to="/tasks" className="nav-link">
                  Tasks
                </Link>
              )}
            </Nav>
            <Nav>
              {!isAuthenticated() ? (
                <>
                  <Link to="/register" className="nav-link">
                    Registrarse
                  </Link>
                  <Link to="/" className="nav-link">
                    Iniciar sesion
                  </Link>
                </>
              ) : (
                <>
                  <a className="nav-link">{getSession().user.name}</a>
                  <a onClick={logout} className="nav-link pointer">
                    Cerrar Sesion
                  </a>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <Suspense fallback={<div>Cargando...</div>}>
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Signin />} />
                <Route path="/tasks" element={<ListTask />} />
              </Routes>
            </Suspense>
          </Col>
        </Row>
      </Container>
    </>
  );
}

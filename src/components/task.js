import React from "react";
import { Card } from "react-bootstrap";
import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";

export default function Task(params) {
  const {
    id = "",
    description = "",
    done = false,
    createdAt = "",
    edit,
    approve,
    remove,
  } = params;
  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title>Task # {id}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Fecha: {createdAt}</Card.Text>
        <Card.Text>Estado: {done ? "Realizada" : "Pendiente"}</Card.Text>
        <div className="d-flex">
          <FaEdit className="icon" onClick={() => edit(id)} />
          {!done ? (
            <FaCheckCircle className="icon" onClick={() => approve(id, true)} />
          ) : null}
          <FaTrash className="icon" onClick={() => remove(id)} />
        </div>
      </Card.Body>
    </Card>
  );
}

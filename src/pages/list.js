import React, { useEffect, useState } from "react";
import { getListTasks, createTask, updateTask, deleteTask } from "../api/task";
import Task from "../components/task";
import { Modal, Button, Form } from "react-bootstrap";

export default function List() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const [description, setDescription] = useState("");
  const handleClose = () => setShow(false);

  function openDialog(id = 0) {
    setId(id);
    if (id !== 0) {
      const tasks = data.filter((value) => value._id === id);
      setDescription(tasks[0].description);
    }
    setShow(true);
  }

  async function completeTask(id) {
    const tasks = data.filter((value) => value._id === id);
    const dataActualizada = await updateTask({
      id: tasks[0]._id,
      description: tasks[0].description,
      done: true,
    });
    modifyData(dataActualizada);
  }

  function modifyData(call) {
    debugger;
    let array = [...data];
    const item = array.findIndex((task) => {
      return task._id === call.data._id;
    });

    array[item] = call.data;
    setData(array);
  }

  async function GetTasks() {
    const data = await getListTasks();
    setData(data.data);
  }

  async function CreateOrUpdateTasks(event) {
    event.preventDefault();
    const { descripcion } = event.target.elements;
    if (id === 0) {
      const call = await createTask({ description: descripcion.value });
      setData([call.data, ...data]);
    } else {
      const call = await updateTask({ id: id, description: descripcion.value });
      modifyData(call);
    }

    setShow(false);
  }

  async function RemoveTask(id) {
    debugger;
    await deleteTask(id);
    let array = [...data];
    const index = array.findIndex((task) => {
      return task._id === id;
    });

    array.splice(index, 1);
    setData(array);
  }

  useEffect(() => {
    GetTasks();
  }, []);

  return (
    <>
      <Button
        className="formulario"
        variant="primary"
        onClick={() => openDialog()}
      >
        Crear Tarea
      </Button>
      {data.map((item) => {
        return (
          <Task
            key={item._id}
            id={item._id}
            description={item.description}
            createdAt={item.createdAt}
            done={item.done}
            edit={openDialog}
            approve={completeTask}
            remove={RemoveTask}
          />
        );
      })}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{id === 0 ? "Crear Tarea" : "Editar Tarea"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={CreateOrUpdateTasks}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                placeholder="Descripcion"
                defaultValue={description}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="icon">
              {id === 0 ? "Crear" : "Editar"}
            </Button>
            <Button variant="secondary" onClick={handleClose} className="icon">
              Cerrar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

import http from "./http";

export function getListTasks() {
  return http.get(`/tasks?direction=desc`).then((data) => data.data);
}

export function createTask(task) {
  return http.post(`/tasks`, task).then((data) => data.data);
}

export function updateTask(task) {
  return http.put(`/tasks/${task.id}`, task).then((data) => data.data);
}

export function deleteTask(id) {
  return http.delete(`/tasks/${id}`).then((data) => data.data);
}

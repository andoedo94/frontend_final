import http from "./http";

export function registerApi(user) {
  return http.post(`/users/signup`, user).then(({ data: json }) => json.data);
}

export function loginUser(user) {
  return http.post(`/users/signin`, user).then(({ data: json }) => json);
}

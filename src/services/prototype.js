import request from "../utils/request";

export function query() {
  return request("/api/users");
}

export function addPrototypeType(params) {
  return request("/addPrototypeType", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

import request from "../utils/request";

export function getRoles(params) {
  return request("/addPrototypeType", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

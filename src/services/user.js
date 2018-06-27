import request from "../utils/request";


export function addUser(params) {
  return request("/pro/pr/addUser", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

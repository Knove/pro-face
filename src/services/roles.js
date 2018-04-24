import request from "../utils/request";

export function getRoles(params) {
  return request("/queryRoles", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
export function addRole(params) {
  return request("/addRole", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
export function deleteRole(params) {
  return request("/deleteRole", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function getRolesProType(params) {
  return request("/queryProTypeByRoleId", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

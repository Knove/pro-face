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

export function getProType(params) {
  return request("/queryPrototypeType", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function addProTypeForRole(params) {
  return request("/addProTypeForRole", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function getUserRole(params) {
  return request("/getUserRole", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

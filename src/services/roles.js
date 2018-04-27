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
  return request("/queryPrototypeTypeAll", {
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

export function getUserByValue(params) {
  return request("/getUserByValue", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function addUserRole(params) {
  return request("/addUserRole", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function deleteRoleProType(params) {
  return request("/deleteProTypeRole", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function deleteRoleUser(params) {
  return request("/deleteUserRole", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

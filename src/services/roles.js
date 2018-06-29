import { request } from "../utils/request";

export function getRoles(params) {
  return request("/pro/queryRoles", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
export function addRole(params) {
  return request("/pro/addRole", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
export function deleteRole(params) {
  return request("/pro/deleteRole", {
    method: "POST",
    body: JSON.stringify(params)
  });
}

export function getRolesProType(params) {
  return request("/pro/queryProTypeByRoleId", {
    method: "POST",
    body: JSON.stringify(params)
  });
}

export function getProType(params) {
  return request("/pro/queryPrototypeTypeAll", {
    method: "POST",
    body: JSON.stringify(params)
  });
}

export function addProTypeForRole(params) {
  return request("/pro/addProTypeForRole", {
    method: "POST",
    body: JSON.stringify(params)
  });
}

export function getUserRole(params) {
  return request("/pro/getUserRole", {
    method: "POST",
    body: JSON.stringify(params)
  });
}

export function getUserByValue(params) {
  return request("/pro/getUserByValue", {
    method: "POST",
    body: JSON.stringify(params)
  });
}

export function addUserRole(params) {
  return request("/pro/addUserRole", {
    method: "POST",
    body: JSON.stringify(params)
  });
}

export function deleteRoleProType(params) {
  return request("/pro/deleteProTypeRole", {
    method: "POST",
    body: JSON.stringify(params)
  });
}

export function deleteRoleUser(params) {
  return request("/pro/deleteUserRole", {
    method: "POST",
    body: JSON.stringify(params)
  });
}

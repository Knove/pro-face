import { request } from "../../utils/request";

export function addDiscuss(params) {
  return request("/pro/addDiscuss", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
export function getDiscuss(params) {
  return request("/pro/getDiscuss", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
export function getDiscussById(params) {
  return request("/pro/getDiscussById", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
export function addDiscussChatBox(params) {
  return request("/pro/addDiscussChatBox", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
export function getDiscussChatBoxByDiscussId(params) {
  return request("/pro/getDiscussChatBoxByDiscussId", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
export function discussClickAdd(params) {
  return request("/pro/discussClickAdd", {
    method: "POST",
    body: JSON.stringify(params)
  });
}

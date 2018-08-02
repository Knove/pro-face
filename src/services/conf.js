import { request } from "../utils/request";

export function addConference(params) {
  return request("/pro/addConference", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
export function getConference(params) {
  return request("/pro/getConference", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
export function deleteConference(params) {
  return request("/pro/deleteConference", {
    method: "POST",
    body: JSON.stringify(params)
  });
}

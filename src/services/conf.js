import { request } from "../utils/request";

export function addConference(params) {
  return request("/pro/addConference", {
    method: "POST",
    body: JSON.stringify(params)
  });
}

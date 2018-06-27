import request from "../utils/request";

export function queryPrototypeType(params) {
  return request("/pro/queryPrototypeType", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
export function queryPrototype(params) {
  return request("/pro/queryPrototype", {
    method: "POST",
    body: JSON.stringify(params)
  });
}

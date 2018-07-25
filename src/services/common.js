import { request, requestFile } from "../utils/request";

export function getSessionUser(params) {
  return request("/pro/queryUser", {
    method: "POST",
    body: JSON.stringify(params),
  });
}


export function testLogin(params) {
  return request("/pro/checkUser", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function sendCaptcha(params) {
  return request("/pro/sendCaptcha", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
export function sendCaptchaOfAlterPass(params) {
  return request("/pro/sendCaptchaOfAlterPass", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function checkLogin(params) {
  return request("/pro/checkLogin", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function checkLoginOfAlterPass(params) {
  return request("/pro/checkLoginOfAlterPass", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function uploadFile(params) {
  return requestFile("/pro/uploadFile", {
    method: "POST",
    body: params
  });
}
export function uploadFileToType(params) {
  return requestFile("/pro/uploadFileToType", {
    method: "POST",
    body: params
  });
}

export function queryPrototypeType(params) {
  return request("/pro/queryPrototypeType", {
    method: "POST",
    body: params
  });
}

export function checkUser(params) {
  return request("/pro/checkUser", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

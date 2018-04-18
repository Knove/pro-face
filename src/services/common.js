import request from "../utils/request";

export function getSessionUser(params) {
  return request("/queryUser", {
    method: "POST",
    body: JSON.stringify(params),
  });
}


export function testLogin(params) {
  return request("/checkUser", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function sendCaptcha(params) {
  return request("/sendCaptcha", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
export function sendCaptchaOfAlterPass(params) {
  return request("/sendCaptchaOfAlterPass", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function checkLogin(params) {
  return request("/checkLogin", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function checkLoginOfAlterPass(params) {
  return request("/checkLoginOfAlterPass", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

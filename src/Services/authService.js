import jwtDecode from "jwt-decode";
import http from "./httpService";

const API_URL =process.env.REACT_APP_BACKEND_URL;

const apiEndpoint = API_URL + "/login";
const tokenKey = "token";


export async function login(username,password) {
    const { data:{token:jwt} } = await http.post(apiEndpoint, { username, password });
    localStorage.setItem(tokenKey, jwt);
    http.setJwt(getJwt());
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  window.location='/';
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
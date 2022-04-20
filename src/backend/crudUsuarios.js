import axios from "axios";

const BCKND_CREATE_USER_ENDPOINT = "http://localhost:3000/insertuser";
const BCKND_READ_USER_ENDPOINT = "http://localhost:3000/selectuser";
const BCKND_READ_ALL_USERS_ENDPOINT = "http://localhost:3000/selectallusers";
const BCKND_UPDATE_USER_ENDPOINT = "http://localhost:3000/updateuser";
const BCKND_DELETE_USER_ENDPOINT = "http://localhost:3000/deleteuser";

function postCreateUser(body) {
  return axios.post(BCKND_CREATE_USER_ENDPOINT, body);
}

function postReadUser(body) {
  return axios.post(BCKND_READ_USER_ENDPOINT, body);
}

function postReadAllUsers() {
  return axios.post(BCKND_READ_ALL_USERS_ENDPOINT);
}

function postUpdateUser(body) {
  return axios.post(BCKND_UPDATE_USER_ENDPOINT, body);
}

function postDeleteUser(body) {
  return axios.post(BCKND_DELETE_USER_ENDPOINT, body);
}

export { postCreateUser, postReadUser, postReadAllUsers, postUpdateUser, postDeleteUser };

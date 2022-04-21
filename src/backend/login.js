import axios from "axios";

const BCKND_ENDPOINT = "http://localhost:3000/users";

function postLogin(body) {
  return axios.post(BCKND_ENDPOINT, body);
}

export default postLogin;

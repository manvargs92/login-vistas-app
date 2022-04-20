import axios from "axios";

const httpClient = axios.create({
  bckndUrl: process.env.BCKND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

console.log("httpClient: ", httpClient);

export default httpClient;

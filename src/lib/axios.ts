import $axios from "axios";

export const axios = $axios.create({
  baseURL: "https://test-twitter-api.lixium.dev",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json"
  }
});

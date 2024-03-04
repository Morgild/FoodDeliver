import axios from "axios";

export const api = axios.create({
  baseURL: "https://fooddelivery1-6xyr.onrender.com/",
  headers: { "Content-Type": "application/json" },
});

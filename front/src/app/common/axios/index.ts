import axios from "axios";

export const api = axios.create({
  baseURL: "https://fooddelivery-khjj.onrender.com/",
  headers: { "Content-Type": "application/json" },
});

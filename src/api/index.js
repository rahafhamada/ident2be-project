import axios from "axios";

export const API_INSTANCE = axios.create({
  baseURL: "https://devel.ident2be.com:1443",
});

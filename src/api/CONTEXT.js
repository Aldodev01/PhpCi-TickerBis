import axios from "axios";
import {
  API_BASEURL_DEV,
  API_BASEURL_LOCAL,
  API_BASEURL_PROD,
} from "../constants/config";

export const contextApi = axios.create({
  baseURL: "https://v1.imezi.com:2000",
  // baseURL: API_BASEURL_PROD,
  // baseURL: API_BASEURL_LOCAL,
});

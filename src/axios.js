import axios from "axios";
import { api } from "./config/config";

export default axios.create({
  baseURL: api.baseURL,
});

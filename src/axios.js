import axios from "axios";
import { api } from "./config/config";
axios.defaults.baseURL = api.baseURL;

export default axios;

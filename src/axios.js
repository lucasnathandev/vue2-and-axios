import axios from "axios";
import { api } from "./config/config";

const instance = axios.create({
  baseURL: api.baseURL,
});

instance.interceptors.request.use(
  (config) => {
    console.log("Interceptando requisição: ", config);
    config.data = {
      ...config.data,
      curso: "Vue JS",
    };
    //   return config;
    return new Promise((resolve) => {
      console.log("Fazendo requisição aguardar");
      setTimeout(() => {
        console.log("Enviando requisição");
        resolve(config);
      }, 2000);
    });
  },
  (error) => {
    console.log("Erro ao fazer requisição: ", error);
    return error;
  }
);

export default instance;

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
    config.headers.common["Authorization"] = `Bearer token_jwt`;
    // Definindo header para tipos de requisição específicos.
    config.headers.put["Meu-Cabecalho"] = "CursoVueJS";
    return config;
    // return new Promise((resolve) => {
    //   console.log("Fazendo requisição aguardar");
    //   setTimeout(() => {
    //     console.log("Enviando requisição");
    //     resolve(config);
    //   }, 2000);
    // });
  },
  (error) => {
    console.log("Erro ao fazer requisição: ", error);
    return error;
  }
);

instance.interceptors.response.use(
  (res) => {
    console.log("Interceptando resposta", res);
    if (Array.isArray(res.data)) {
      res.data = res.data.slice(1, 3);
    }
    return res;
  },
  (error) => {
    console.log("Erro capturado no interceptador da respostas", error);
    return Promise.reject(error);
  }
);

export default instance;

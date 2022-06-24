<template>
  <div id="app">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Requisições HTTP no Vue</h1>
        <p class="lead">
          Usando a biblioteca Axios para fazer chamadas Ajax à uma API REST.
        </p>
      </div>
    </div>

    <div class="container">
      <TarefasLista />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { api } from "./config/config";
import TarefasLista from "./components/TarefasLista.vue";

export default {
  components: {
    TarefasLista,
  },
  created() {
    axios
      .all([
        axios.get(`${api.baseURL}/tarefas/1`),
        axios.get(`${api.baseURL}/tarefas/3`),
      ]) //Trabalhando com recursos do ES6
      .then((res) => {
        const [tarefa1, tarefa3] = res;
        console.log("Requisições simultâneas:");
        console.log("Tarefa 1", tarefa1);
        console.log("Tarefa 3", tarefa3);
      });
    // .then(
    //   axios.spread((tarefa1, tarefa3) => {
    // console.log("Requisições simultâneas:");
    // console.log("Tarefa 1", tarefa1);
    // console.log("Tarefa 3", tarefa3);
    //   })
    // );
  },
};
</script>
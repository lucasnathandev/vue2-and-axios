<template>
  <div>
    <div class="row">
      <div class="col-sm-10">
        <h1 class="font-weight-light">Lista de Tarefas</h1>
      </div>
      <div class="col-sm-2">
        <button
          @click="exibirFormulario = !exibirFormulario"
          class="btn btn-primary float-right"
        >
          <i class="fa fa-plus mr-2"></i>
          <span>Criar</span>
        </button>
      </div>
    </div>

    <ul class="list-group" v-if="tarefas.length > 0">
      <TarefasListaIten
        v-for="tarefa in tarefas"
        :key="tarefa.id"
        :tarefa="tarefa"
      />
    </ul>

    <p v-else>Nenhuma tarefa criada.</p>

    <TarefaSalvar @criar="criarTarefa" v-if="exibirFormulario" />
  </div>
</template>

<script>
import { api } from "../config/config.js";
import axios from "axios";
const TarefaSalvar = () => import("./TarefaSalvar.vue");
const TarefasListaIten = () => import("./TarefasListaIten.vue");

export default {
  components: {
    TarefaSalvar,
    TarefasListaIten,
  },
  data() {
    return {
      tarefas: [],
      exibirFormulario: false,
    };
  },
  created() {
    axios
      .get(api.baseURL + "/tarefas")
      .then((res) => (this.tarefas = res.data));
  },
  methods: {
    criarTarefa(tarefa) {
      axios.post(api.baseURL + "/tarefas", tarefa).then((res) => {
        console.log("POST /tarefas", res);
        this.tarefas.push(res.data);
        this.exibirFormulario = false;
      });
    },
  },
};
</script>

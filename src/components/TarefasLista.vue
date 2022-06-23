<template>
  <div>
    <div class="row">
      <div class="col-sm-10">
        <h1 class="font-weight-light">Lista de Tarefas</h1>
      </div>
      <div class="col-sm-2">
        <button
          @click="exibirFormCriarTarefa"
          class="btn btn-primary float-right"
        >
          <i class="fa fa-plus mr-2"></i>
          <span>Criar</span>
        </button>
      </div>
    </div>

    <ul class="list-group" v-if="tarefas.length > 0">
      <TarefasListaIten
        v-for="tarefa in tarefasOrdenadas"
        :key="tarefa.id"
        :tarefa="tarefa"
        @editar="selecionarTarefaParaEdicao"
        @deletar="deletarTarefa"
        @concluir="editarTarefa"
      />
    </ul>

    <p v-else>Nenhuma tarefa criada.</p>

    <TarefaSalvar
      :tarefa="tarefaSelecionada"
      @criar="criarTarefa"
      v-if="exibirFormulario"
      @editar="editarTarefa"
    />
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
      tarefaSelecionada: undefined,
    };
  },
  computed: {
    tarefasOrdenadas() {
      return Array.from(this.tarefas).sort((t1, t2) => {
        if (t1.concluido === t2.concluido) {
          return t1.titulo < t2.titulo ? -1 : t1.titulo > t2.titulo ? 1 : 0;
        }
        return t1.concluido - t2.concluido;
      });
    },
  },
  created() {
    axios.get(api.baseURL + "/tarefas").then((res) => {
      console.log("GET /tarefas", res);
      this.tarefas = res.data;
    });
  },
  methods: {
    criarTarefa(tarefa) {
      axios.post(api.baseURL + "/tarefas", tarefa).then((res) => {
        console.log("POST /tarefas", res);
        this.tarefas.push(res.data);
        this.resetar();
      });
    },
    editarTarefa(tarefa) {
      axios.put(api.baseURL + "/tarefas/" + tarefa.id, tarefa).then((res) => {
        console.log("PUT /tarefas" + tarefa.id, res);
        const index = this.tarefas.findIndex((t) => t.id === tarefa.id);
        this.tarefas.splice(index, 1, res.data);
        this.resetar();
      });
    },
    deletarTarefa(tarefa) {
      const confirmar = window.confirm(
        "Quer realmente deletar a tarefa:",
        tarefa.titulo + "?"
      );
      if (confirmar)
        axios.delete(api.baseURL + "/tarefas/" + tarefa.id).then((res) => {
          console.log("DELETE /tarefas/" + tarefa.id, res);
          const index = this.tarefas.findIndex((t) => t.id === tarefa.id);
          this.tarefas.splice(index, 1);
        });
    },
    resetar() {
      this.tarefaSelecionada = undefined;
      this.exibirFormulario = false;
    },
    selecionarTarefaParaEdicao(tarefa) {
      this.tarefaSelecionada = tarefa;
      this.exibirFormulario = true;
    },
    exibirFormCriarTarefa() {
      if (this.tarefaSelecionada) {
        this.tarefaSelecionada = undefined;
        return;
      }
      this.exibirFormulario = !this.exibirFormulario;
    },
  },
};
</script>

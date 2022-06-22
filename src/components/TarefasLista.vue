<template>
  <div>
    <h1 class="font-weight-light">Lista de Tarefas</h1>

    <ul class="list-group" v-if="tarefas.length > 0">
      <TarefasListaIten
        v-for="tarefa in tarefas"
        :key="tarefa.id"
        :tarefa="tarefa"
      />
    </ul>

    <p v-else>Nenhuma tarefa criada.</p>

    <TarefaSalvar />
  </div>
</template>

<script>
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
    };
  },
};
</script>

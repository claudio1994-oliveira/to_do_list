<template>
    <h1>Lista de tarefas <router-link :to="{name: 'todos.create'}"  >+</router-link> </h1>

    <div v-if="loading">
        Carregando ...
    </div>
    <ul>
        <li v-for="todo in todos" :key="todo.identify">
          <p>
            <b>Título:</b> Título: {{ todo.title }}
          </p> 
          <p>
            <b>Descrição:</b>  {{ todo.body }}
          </p>
            
        </li>
    </ul>
</template>
<script>
import TodoServive from '@/services/todos.services'
import { onMounted, ref } from 'vue';

export default {
    name: 'Todos',
    setup() {
        const todos = ref([])
        const loading = ref(false)

        onMounted(async () => {

            loading.value = true
            TodoServive.getAll()
            .then(response => {
                todos.value = response.data.data
               
            }).catch(error => {
                console.log(error, 'ERRO')
            }).finally(() => loading.value = false)
        })

        return {
            todos,
            loading
        }
      
    }
}
</script>
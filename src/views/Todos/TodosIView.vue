<template >
    <div class="container">
        <h1>Lista de tarefas 
        <router-link class="btn btn-primary" :to="{name: 'todos.create'}"  >+</router-link> 
    </h1>

    <div v-if="loading">
        Carregando ...
    </div>
    <ol class="list-group list-group-numbered">
         <li class="list-group-item d-flex justify-content-between align-items-start" v-for="todo in todos" :key="todo.identify">
     
            <todo :todo="todo" @toDoDeleted="deleteToDoList" @toogleStatus="todoStatusUpdated" />
        </li> 
    </ol>
    </div>
    
</template>
<script>
import TodoServive from '@/services/todos.services'
import Todo from './Todo.vue';

import { onMounted, ref } from 'vue';

export default {
    name: 'Todos',
    setup() {
        const todos = ref([])
        const loading = ref(false)

        onMounted(async () => {

            loading.value = true
            getAll()
        })

        const getAll = () => {
            TodoServive.getAll()
            .then(response => {
                todos.value = response.data.data
               
            }).catch(error => {
                console.log(error, 'ERRO')
            }).finally(() => loading.value = false)
        }

        const deleteToDoList = (todo) => {
           todos.value.splice(todos.value.indexOf(todo), 1) 
        }

        const todoStatusUpdated = (todo) => getAll()

        return {
            todos,
            loading,
            deleteToDoList,
            todoStatusUpdated
        }
      
    },
    components: {
        Todo
    }
}
</script>
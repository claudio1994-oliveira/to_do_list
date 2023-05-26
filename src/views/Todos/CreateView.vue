<template>
    <div class="container">
        <h1>Adicionar nova tarefas</h1>
        <form action="#" method="post" @submit.prevent="addTodo">
            <div class="mb-3">
                <label for="title" class="form-label">Titulo</label>
                <input type="text" id="title" class="form-control" name="title" placeholder="Título" v-model="todo.name">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Descrição</label>
                <input type="text" name="description" id="description" class="form-control" placeholder="Descrição" v-model="todo.description">
            </div>
                <button type="submit" class="btn btn-success" :disabled="todo.loading">
                    <span v-if="todo.loading">Enviando...</span>
                    <span v-else>Enviar</span>
                </button>
        </form>
    </div>
</template>
<script>
import { reactive } from 'vue'
import TodoService from '@/services/todos.services';
import router from '@/router'

export default {
    name: 'Novo',
    

    setup() {
        const todo = reactive({
            name: '',
            description: '',
            completed: false,
            loading: false
        })
       const addTodo = () => {
        todo.loading = true
            TodoService.addTodo({...todo})
                        .then(() => router.push({name: 'todos.index'}))
                        .finally(() => todo.loading = false)
       }

    return {
        addTodo,
        todo
    }
      
    }
}
</script>
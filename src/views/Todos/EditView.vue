<template>
    <div class="container">
        <h1>Adicionar nova tarefas</h1>
        <form action="#" method="post" @submit.prevent="editTodo">
            <div class="mb-3">
                <label for="title" class="form-label">Titulo</label>
                <input type="text" class="form-control" name="title" id="title" placeholder="Título" v-model="todo.name">
            </div>

            <div class="mb-3">
                <label for="description" class="form-label">Descrição</label>
                <input type="text" id="description" class="form-control" name="description" placeholder="Descrição" v-model="todo.description">
            </div>
                
                <button type="submit" class="btn btn-success" :disabled="todo.loading">
                    <span v-if="todo.loading">Atualizando...</span>
                    <span v-else>Atualizar</span>
                </button>
        </form>
    </div>
    
</template>
<script>
import { onMounted, reactive } from 'vue'
import TodoService from '@/services/todos.services';
import router from '@/router'

export default {
    name: 'Editar',
    props: {
        id: {
            require: true,
        }
    },
    setup(props) {
        const todo = reactive({
            name: '',
            description: '',
            completed: false,
            loading: false
        })

        onMounted(async () => {
            todo.loading = true
            TodoService.getTodo(props.id)
                        .then(response => {
                            const todoR = response.data.data
                            todo.name = todoR.title
                            todo.description = todoR.body
                            todo.completed = todoR.completed == 'S'
                        })
                        .finally(() => todo.loading = false)
        })


       const editTodo = () => {
        todo.loading = true
            TodoService.editTodo(props.id, {...todo})
                        .then(() => router.push({name: 'todos.index'}))
                        .finally(() => todo.loading = false)
       }

    return {
        editTodo,
        todo
    }
      
    }
}
</script>
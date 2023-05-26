<template>
  <div class="ms-2 me-auto">
      <div class="fw-bold">{{ todo.title }}</div>
        {{ todo.body }}
        <a href="#" @click.prevent="toogleStatus">
            <span v-if="completed" class="badge bg-success rounded-pill">Feita!</span>
            <span v-else class="badge bg-warning rounded-pill" >A Fazer!</span>
        </a>
  </div>
  <router-link :to="{name: 'todos.edit', params:{id: todo.identify}}" class="btn btn-primary"> Editar </router-link>
  <a href="#" @click.prevent="deleteToDo" class="btn btn-danger" >Deletar</a>
</template>

<script>
import todoService from '@/services/todos.services'
import { computed } from 'vue'

export default {
    name: 'Todo',
    props: {
        todo: {
            require: true,
            type: Object
        }
    },
    setup(props, {emit}) {
        const completed = computed(() =>  props.todo.completed == 'S')
        
        const deleteToDo = () => {
            confirm('Você deseja apagar esta tarefa? A ação não poderá ser desfeita')
            todoService.deleteTodo(props.todo.identify)
            .then(() =>{
                emit('toDoDeleted', props.todo)
            })
        }

        const toogleStatus = () => {
            const params = {
                name: props.todo.title,
                description: props.todo.body,
                completed: !completed.value 
            }

            todoService.editTodo(props.todo.identify, params)
                .then(() => emit('toogleStatus', params))
        }

        return {
           
            deleteToDo,
            completed,
            toogleStatus
        }
    }
   
}
</script>
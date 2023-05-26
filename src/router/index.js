import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodosIndex from '@/views/Todos/TodosIView.vue'
import TodosCreate from '@/views/Todos/CreateView.vue'
import TodosEdit from '@/views/Todos/EditView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/todos',
    name: 'todos.index',
    component: TodosIndex
  },
  {
    path: '/todos/create',
    name: 'todos.create',
    component: TodosCreate
  },
  {
    path: '/todos/:id/edit',
    name: 'todos.edit',
    component: TodosEdit,
    props: true
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import Overview from './views/Overview.vue'
import TodoList from './views/TodoList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Overview
    },
    {
      path: '/todoList/:listId',
      name: 'todoList',
      component: TodoList
    }
  ]
})

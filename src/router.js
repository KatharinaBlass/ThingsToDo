import Vue from 'vue'
import Router from 'vue-router'
import Overview from './views/Overview.vue'
import TodoList from './views/TodoList.vue'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Overview,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/todoList/:listId',
      name: 'todoList',
      component: TodoList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn,
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
    },
  ]
});


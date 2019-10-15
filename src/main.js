import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next('/sign-in');
  } else if (requiresAuth && currentUser && !currentUser.emailVerified) {
    next('/wait-for-verification');
  } else {
    next();
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

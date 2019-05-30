import Vue from 'vue'
import App from './App.vue'
import router from './router'
const firebaseConfig = require('./firebaseConfig.js')

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const currentUser = firebaseConfig.firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next('/sign-in');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

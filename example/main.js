import Vue from 'vue'
import App from './App.vue'
import JY from '../src'
Vue.use(JY)

/* eslint-disable no-new */
new Vue({
  render(createElement) {
    return createElement(App)
  }
}).$mount('#app')

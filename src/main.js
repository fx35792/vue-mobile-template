import Vue from 'vue'
import router from './router'
import store from './store'
import Axios from '@/utils/Axios'
import App from './App.vue'
import 'lib-flexible/flexible' // 根据窗口不同，给html设置不同的font-size值
import './utils/vant' // 引入局部ui
import './assets/css/common.less'
import Vconsole from 'vconsole'

Vue.config.productionTip = false
const environment = process.env.VUE_APP_NODE_ENV;
if(environment==='development'||environment==='test'){
  const vConsole = new Vconsole()
  Vue.use(vConsole)
}


// vue内部全局注入
Vue.use({
  install (vue) {
    Object.assign(vue.prototype, {
      $axios: Axios,
      $store: store
    })
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

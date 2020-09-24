import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import home from './modules/home'
import list from './modules/list'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["home"]
})
Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: { home, list },
  plugins: [vuexLocal.plugin]
})

export default store

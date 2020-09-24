import Vue from "vue";
import Request from './request'
//import config from '@/config'
const Axios = new Request()
Plugin.install=(Vue)=>{
    Vue.prototype.$http = Axios
}
Object.assign(window,{
    $http:Axios
})
Vue.use(Plugin);
export default Axios

import Vue from 'vue'
import {Loading, Lazyload, Button, Toast, Dialog,} from 'vant'

// 默认vant组件
[Loading, Lazyload, Button, Toast, Dialog,].forEach(item => Vue.use(item))

// 先预制，后期做统一调整
Object.assign(window, {
  Toast, Dialog
})

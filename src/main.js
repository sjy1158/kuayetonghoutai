// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from '@/App'
import router from '@/router'
import { Auth, Api } from '@/plugins'
import Time from './plugins/changeTime'
import * as filters from '@/filters'
import moment from 'moment'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Object.keys(filters).forEach(k => {
    Vue.filter(k, filters[k])
})

Vue.use(ElementUI)
Vue.use(Auth)
Vue.use(Api)
Vue.use(Time)
Vue.use(VueQuillEditor)

moment.locale('zh-cn')

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App />',
    components: { App }
})

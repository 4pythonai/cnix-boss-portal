// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueWechatTitle from 'vue-wechat-title'



Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(VueWechatTitle)


Vue.config.productionTip = false

const Bus = new Vue()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    data: {
        Bus,
        URL: 'http://103.151.148.2:8502/v2',

    },
    components: { App },
    template: '<App/>'
})

import Vue from 'vue'
import Router from 'vue-router'
import Allselect from '@/components/Allselect'
import Contract from '@/components/Contract'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Allselect,
            meta: {
                title: '资源编辑器VUE'
            }
        },
        {
            path: '/contract',
            component: Contract,
            meta: {
                title: '合同选择器'
            }
        }


    ]
})



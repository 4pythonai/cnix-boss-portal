import AuthService from '../auth/AuthService'
window.win_requireAuth = function(nextState, replace, callback) {  // 判断是否登录
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
        console.log('not login')
        replace('/login') // 如果没有登录就跳转到登录路由
    }
    return callback()
}

export default {

    onEnter: win_requireAuth, // add this 判断是否登录
    component: require('../../components/layout').default,
    childRoutes: [
        {
            path: 'processmanagement',
            getComponent(nextState, cb) {
                import('./container/processmanagement').then((m) => {
                    cb(null, m.default)
                })
            }

        },
        {
            path: 'processmanagement/pluginsMnt',
            getComponent(nextState, cb) {
                import('./container/pluginuform').then((m) => {
                    cb(null, m.default)
                })
            }

        },

    ]
}




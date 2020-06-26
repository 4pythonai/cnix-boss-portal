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

    onEnter: win_requireAuth, 
    path: 'saleschancemnt',
    component: require('../../components/layout').default,
    childRoutes: [
        {
            path: 'chanceDetail',
            getComponent(nextState, cb) {
                import('./containers/chanceDetail').then((m) => {
                    cb(null, m.default)
                })
            }

        },
        {
            path: 'resourceSurveyDetail',
            getComponent(nextState, cb) {
                import('./containers/resourceSurveyDetail').then((m) => {
                    cb(null, m.default)
                })
            }

        }
    ]
}




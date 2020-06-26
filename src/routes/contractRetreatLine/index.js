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
    path: 'contractRetreatLine',
    component: require('../../components/layout').default,
    childRoutes: [
      {
        path: 'generateRetreatLine',
        getComponent(nextState, cb) {
          import('./containers/generateRetreatLine').then((m) => {
            cb(null, m.default)
          })
        }
      }
    ]
  }

export default {

    onEnter: win_requireAuth, // add this 判断是否登录
    path: 'graphic',
    component: require('../../components/layout').default,
    childRoutes: [
        {
            path: 'lineChart',
            getComponent(nextState, cb) {
                import('./containers/lineChart').then((m) => {
                    cb(null, m.default)
                })
            }
        },
        {
            path: 'pieChart',
            getComponent(nextState, cb) {
                import('./containers/pieChart').then((m) => {
                    cb(null, m.default)
                })
            }
        },
        {
            path: 'areaChart',
            getComponent(nextState, cb) {
                import('./containers/areaChart').then((m) => {
                    cb(null, m.default)
                })
            }
        },
        {
            path: 'barChart',
            getComponent(nextState, cb) {
                import('./containers/barChart').then((m) => {
                    cb(null, m.default)
                })
            }
        },
        {
            path: 'pointChart',
            getComponent(nextState, cb) {
                import('./containers/pointChart').then((m) => {
                    cb(null, m.default)
                })
            }
        },
    ]
}




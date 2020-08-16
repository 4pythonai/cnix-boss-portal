
export default {

    onEnter: win_requireAuth, // add this
    path: 'report',
    component: require('../../components/layout').default,
    childRoutes: [
        {
            path: 'monthlyShouldGet',
            getComponent(nextState, cb) {
                import('./containers/monthlyShouldGet').then((m) => {
                    cb(null, m.default)
                })
            }
        },

        {
            path: 'prodreport',
            getComponent(nextState, cb) {
                import('./containers/prodreport').then((m) => {
                    cb(null, m.default)
                })
            }
        },



    ]
}





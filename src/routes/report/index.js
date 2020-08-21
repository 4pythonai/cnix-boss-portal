
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
            path: 'custOwned',
            getComponent(nextState, cb) {
                import('./containers/custOwned').then((m) => {
                    cb(null, m.default)
                })
            }
        },



    ]
}





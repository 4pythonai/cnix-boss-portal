
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

        {
            path: 'custPayed',
            getComponent(nextState, cb) {
                import('./containers/custPayed').then((m) => {
                    cb(null, m.default)
                })
            }
        },

        {
            path: 'shouldByPaperBill',
            getComponent(nextState, cb) {
                import('./containers/shouldByPaperBill').then((m) => {
                    cb(null, m.default)
                })
            }
        },

        {
            path: 'MRR',
            getComponent(nextState, cb) {
                import('./containers/MRR').then((m) => {
                    cb(null, m.default)
                })
            }
        },








    ]
}





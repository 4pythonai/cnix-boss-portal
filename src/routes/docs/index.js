


export default {

    component: require('./containers/docs').default,
    childRoutes: [
        {
            path: 'docs',
            getComponent(nextState, cb) {
                import('./containers/docs').then((m) => {
                    cb(null, m.default)
                })
            }

        }
    ]
}




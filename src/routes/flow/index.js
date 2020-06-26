export default {
    path: 'flow',
    component: require('../../components/layout').default,

    childRoutes: [

        {
            path: 'flowProgress',
            getComponent(nextState, cb) {
                import('./containers/flowProgress').then((m) => {
                    cb(null, m.default)
                })
            }
        },

        {
            path: 'testFlow',
            getComponent(nextState, cb) {
                import('./containers/testFlow').then((m) => {
                    cb(null, m.default)
                })
            }
        },
        {
            path: 'flowForm',
            getComponent(nextState, cb) {
                import('./containers/flowForm').then((m) => {
                    cb(null, m.default)
                })
            }
        },
        {
            path: 'flowDetail',
            getComponent(nextState, cb) {
                import('./containers/flowDetail').then((m) => {
                    cb(null, m.default)
                })
            }
        },
        {
            path: 'flowRelatedInfo',
            getComponent(nextState, cb) {
                import('./containers/flowRelatedInfo').then((m) => {
                    cb(null, m.default)
                })
            }
        }

    ]
};

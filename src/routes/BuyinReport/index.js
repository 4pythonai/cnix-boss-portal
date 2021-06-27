export default {
    onEnter: win_requireAuth, // add this
    path: 'BuyinReport',
    component: require('../../components/layout').default,
    childRoutes: [
        {
            path: 'BuyinRptView',
            getComponent(nextState, cb) {
                import('./containers/BuyinRptView').then((m) => {
                    cb(null, m.default);
                });
            }
        }
    ]
};

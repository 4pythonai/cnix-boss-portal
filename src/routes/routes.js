const routes = {
    path: '/',

    indexRoute: { onEnter: (nextState, replace) => replace('/home') },
    childRoutes: [
        require('./home').default,
        require('./auth').default,
        require('./commonAntTable').default,
        require('./dashboard').default,
        require('./processmanagement').default,
        require('./datagridmnt').default,
        require('./docs').default,
        require('./settings').default,
        require('./profile').default,
        require('./permissionManage').default,
        require('./Toolpage').default,
        require('./report').default,
        require('./report/buyindex').default,
        require('./BillingDebuger').default,
        require('./BuyinCodeMnt').default,
        require('./applog').default,
        require('./BuyinReport').default
    ]
};

console.log(routes);
export { routes };

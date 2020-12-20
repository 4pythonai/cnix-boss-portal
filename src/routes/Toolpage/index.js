import AuthService from '../auth/AuthService';
window.win_requireAuth = function(nextState, replace, callback) {
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
        console.log('not login');
        replace('/login');
    }
    return callback();
};


export default {

    onEnter: window.win_requireAuth,
    component: require('../../components/layout').default,
    childRoutes: [
        {
            path: 'Toolpage',
            getComponent(nextState, cb) {
                import('./containers/Toolpage').then((m) => {
                    cb(null, m.default);
                });
            }

        }
    ]
};

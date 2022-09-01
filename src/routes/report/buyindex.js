export default {
    onEnter: win_requireAuth, // add this
    path: 'BuyReport',
    component: require('../../components/layout').default,
    childRoutes: [
        {
            path: 'ShouldPayVendorFromContractBill',
            getComponent(nextState, cb) {
                import('./BuyContainers/ShouldPayVendorFromContractBill').then((m) => {
                    cb(null, m.default);
                });
            }
        },

        {
            path: 'AlreadyPayVendorFromContractBill',
            getComponent(nextState, cb) {
                import('./BuyContainers/AlreadyPayVendorFromContractBill').then((m) => {
                    cb(null, m.default);
                });
            }
        },
        {
            path: 'OwnedVendorFromContractBill',
            getComponent(nextState, cb) {
                import('./BuyContainers/OwnedVendorFromContractBill').then((m) => {
                    cb(null, m.default);
                });
            }
        },
        {
            path: 'BUYMRR',
            getComponent(nextState, cb) {
                import('./BuyContainers/BUYMRR').then((m) => {
                    cb(null, m.default);
                });
            }
        },
        {
            path: 'PayPrediction',
            getComponent(nextState, cb) {
                import('./BuyContainers/PayPrediction').then((m) => {
                    cb(null, m.default);
                });
            }
        },
        {
            path: 'ShouldPayVendorFromPaperBill',
            getComponent(nextState, cb) {
                import('./BuyContainers/ShouldPayVendorFromPaperBill').then((m) => {
                    cb(null, m.default);
                });
            }
        },
        {
            path: 'AlreadyPayVendorFromPaperBill',
            getComponent(nextState, cb) {
                import('./BuyContainers/AlreadyPayVendorFromPaperBill').then((m) => {
                    cb(null, m.default);
                });
            }
        },
        {
            path: 'OwnedPayVendorFromPaperBill',
            getComponent(nextState, cb) {
                import('./BuyContainers/OwnedPayVendorFromPaperBill').then((m) => {
                    cb(null, m.default);
                });
            }
        }
    ]
};

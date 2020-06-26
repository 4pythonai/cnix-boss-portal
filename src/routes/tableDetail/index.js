export default {
    childRoutes: [
      {
        path: 'tableDetail',
        getComponent(nextState, cb){
          import('./containers/tableDetail').then((m)=> {
            cb(null, m.default)
          })
        }
      }
    ]
  };
  
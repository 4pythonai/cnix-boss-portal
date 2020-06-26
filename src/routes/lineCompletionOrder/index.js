export default {
    childRoutes: [
      {
        path: 'lineCompletionOrder',
        getComponent(nextState, cb){
          import('./containers/LineCompletionOrder').then((m)=> {
            cb(null, m.default)
          })
        }
      }
    ]
  };
  
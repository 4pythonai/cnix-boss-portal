export default {
    childRoutes: [
      {
        path: 'completionOrder',
        getComponent(nextState, cb){
          import('./containers/CompletionOrder').then((m)=> {
            cb(null, m.default)
          })
        }
      }
    ]
  };
  
export default {
    childRoutes: [
      {
        path: 'completionOrdercompare',
        getComponent(nextState, cb){
          import('./containers/CompletionOrdercompare').then((m)=> {
            cb(null, m.default)
          })
        }
      }
    ]
  };
  
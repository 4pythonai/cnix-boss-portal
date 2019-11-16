  
export default {
  
    onEnter: win_requireAuth, // add this
    path: 'permissionManage',
    component: require('../../components/layout').default,
    childRoutes: [
      { 
        path: 'menuManage',
        getComponent(nextState, cb){
          import('./containers/menuManage').then((m)=> {
            cb(null, m.default)
          })
        }
      },
      { 
        path: 'buttonManage',
        getComponent(nextState, cb){
          import('./containers/buttonManage').then((m)=> {
            cb(null, m.default)
          })
        }
      },
      { 
        path: 'roleManage',
        getComponent(nextState, cb){
          import('./containers/roleManage').then((m)=> {
            cb(null, m.default)
          })
        }
      },
      { 
        path: 'permissionDetail',
        getComponent(nextState, cb){
          import('./containers/permissionDetail').then((m)=> {
            cb(null, m.default)
          })
        }
      },
      { 
        path: 'allocationMenu',
        getComponent(nextState, cb){
          import('./containers/allocationMenu').then((m)=> {
            cb(null, m.default)
          })
        }
      },
      { 
        path: 'allocationButton',
        getComponent(nextState, cb){
          import('./containers/allocationButton').then((m)=> {
            cb(null, m.default)
          })
        }
      },
      { 
        path: 'departmentManage',
        getComponent(nextState, cb){
          import('./containers/departmentManage').then((m)=> {
            cb(null, m.default)
          })
        }
      },
      { 
        path: 'userManage',
        getComponent(nextState, cb){
          import('./containers/userManage').then((m)=> {
            cb(null, m.default)
          })
        }
      },
      { 
        path: 'lookUserByRole',
        getComponent(nextState, cb){
          import('./containers/lookUserByRole').then((m)=> {
            cb(null, m.default)
          })
        }
      },
    ]
  }
  
  
   
  


export default {

  onEnter: win_requireAuth, // add this
  path: 'contract',
  component: require('../../components/layout').default,
  childRoutes: [
    {
      path: 'addIdcContract',
      getComponent(nextState, cb) {
        import('./containers/addIdcContract').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'detailIDCContract',
      getComponent(nextState, cb) {
        import('./containers/detailIDCContract').then((m) => {
          cb(null, m.default)
        })
      }
    },
  ]
}




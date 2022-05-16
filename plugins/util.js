export default ({ app, env }, inject) => {
  // 認証確認
  inject('authCheck', async (msg) => {
    let sid = ''
    if (env.mode === 'local') {
      sid = app.store.state.dummySid
    }
    const res = await app.$authapi(['login', 'status', { sid }])
    app.store.commit('addAuth', { key: 'loggedin', val: false })
    // ログイン中
    if (res.status === 200) {
      app.store.commit('addAuth', { key: 'loggedin', val: true })
      // ログイン中は非表示
      if (app.router.currentRoute.fullPath === '/login') {
        app.router.push('/')
        return
      }
      if (app.router.currentRoute.fullPath === '/signup') {
        app.router.push('/')
        return
      }
      return
    }
    // ログアウト中でも表示
    if (app.router.currentRoute.fullPath === '/') {
      return
    }
    if (app.router.currentRoute.fullPath === '/login') {
      return
    }
    if (app.router.currentRoute.fullPath === '/signup') {
      return
    }
    app.router.push('/')
  })
}

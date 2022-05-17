export default ({ app, env }, inject) => {
  // 認証確認
  inject('authCheck', async () => {
    let sid = ''
    if (env.mode === 'local') {
      sid = app.store.state.dummySid
    }
    const res = await app.$authapi(['login', 'status', { sid }])
    app.store.commit('addAuth', { key: 'loggedin', val: false })
    const current = app.router.currentRoute.fullPath
    // ログイン中
    if (res.status === 200) {
      app.store.commit('addAuth', { key: 'loggedin', val: true })
      app.store.commit('addAuth', { key: 'user', val: res.user })
      // ログイン中は非表示
      if (current === '/login' || current === '/signup') {
        app.router.push('/')
        return
      }
      // 一般ユーザーには表示しない
      if (current === '/user' && res.user.limitation === 200) {
        app.router.push('/')
        return
      }
      return
    }
    app.store.commit('addAuth', { key: 'loggedin', val: false })
    app.store.commit('addAuth', { key: 'user', val: {} })
    // ログアウト中でも表示
    if (current === '/' || current === '/login' || current === '/signup') {
      return
    }
    app.router.push('/')
  })
}

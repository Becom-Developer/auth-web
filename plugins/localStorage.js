export default ({ app, store }) => {
  syncLocalStorage(store, { key: 'beauth' })
}

// localStorage(優先的に採用)
//  -> vuex state(新規に定義された値を含み完成)
//    -> localStorage(stateと同期) mutations 内で実行
function syncLocalStorage(store, args) {
  const params = JSON.parse(localStorage.getItem(args.key))
  if (!params) {
    localStorage.setItem(
      'beauth',
      JSON.stringify({ dummySid: store.state.dummySid })
    )
    return
  }
  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      const element = params[key]
      store.commit('addSid', element)
    }
  }
}

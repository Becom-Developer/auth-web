export const state = () => ({
  form: {
    signup: { loginid: '', password: '' },
    login: { loginid: '', password: '' },
    logout: { loginid: '' },
  },
  loggedin: false,
  userList: [],
  dummySid: '',
  auth: { loggedin: false, user: {} },
})
export const mutations = {
  addSid(state, sid) {
    if (process.env.mode === 'local' || process.env.mode === 'staging') {
      state.dummySid = sid
      localStorage.setItem('beauth', JSON.stringify({ dummySid: sid }))
    }
  },
  addState(state, { stateKey, data }) {
    state[stateKey] = data
  },
  addForm(state, { formKey, row }) {
    for (const key in row) {
      if (Object.hasOwnProperty.call(row, key)) {
        state.form[formKey][key] = row[key]
      }
    }
  },
  addAuth(state, { key, val }) {
    state.auth[key] = val
  },
  clearForm(state, formKey) {
    for (const key in state.form[formKey]) {
      state.form[formKey][key] = ''
    }
  },
}

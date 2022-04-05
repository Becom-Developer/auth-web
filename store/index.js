export const state = () => ({
  form: {
    signup: { loginid: '', password: '' },
    login: { loginid: '', password: '' },
    logout: { loginid: '' },
  },
  loggedin: false,
  userList: [],
  dummySid: '',
})
export const mutations = {
  addSid(state, sid) {
    if (process.env.mode === 'local') {
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
  clearForm(state, formKey) {
    for (const key in state.form[formKey]) {
      state.form[formKey][key] = ''
    }
  },
}

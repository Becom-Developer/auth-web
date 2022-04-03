export const state = () => ({
  form: {
    signup: { loginid: '', password: '' },
    login: { loginid: '', password: '' },
    logout: { loginid: '' },
  },
  loggedin: false
})
export const mutations = {
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

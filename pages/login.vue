<template>
  <b-container>
    <b-jumbotron header="login" lead="auth-web: login">
      <p>ログインの実行をします</p>
      <b-btn variant="primary" @click="$router.push('/')">トップへ戻る</b-btn>
    </b-jumbotron>
    <div>
      <b-card no-body>
        <b-tabs card class="text-center">
          <b-tab title="login">
            <b-card-text>ログインの実行をします</b-card-text>
            <b-container fluid class="p-0">
              <b-card title="ログイン実行" sub-title="Card subtitle">
                <b-row class="my-1">
                  <b-col sm="3" class="text-left">
                    <label :for="`type-loginid`">loginid:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                      :id="`type-loginid`"
                      v-model="loginid"
                      :type="`text`"
                    ></b-form-input>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col sm="3" class="text-left">
                    <label :for="`type-password`">password:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input
                      :id="`type-password`"
                      v-model="password"
                      :type="`text`"
                    ></b-form-input>
                  </b-col>
                </b-row>
                <b-btn block size="sm" @click="sendForm">ログイン実行</b-btn>
                <b-alert
                  variant="success"
                  dismissible
                  :show="isCompleted"
                  @dismissed="isCompleted = false"
                  >ログインは成功しました。{{ res }}</b-alert
                >
                <b-alert
                  variant="danger"
                  dismissible
                  :show="isError"
                  @dismissed="isError = false"
                  >ログインは失敗しました。{{ res }}</b-alert
                >
              </b-card>
            </b-container>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      isCompleted: false,
      isError: false,
      res: {},
    }
  },
  computed: {
    ...mapState(['form']),
    loginid: {
      get() {
        return this.form.login.loginid
      },
      set(val) {
        this.addForm({ formKey: 'login', row: { loginid: val } })
      },
    },
    password: {
      get() {
        return this.form.login.password
      },
      set(val) {
        this.addForm({ formKey: 'login', row: { password: val } })
      },
    },
  },
  methods: {
    ...mapMutations(['addForm', 'clearForm', 'addSid']),
    async sendForm() {
      this.isCompleted = false
      this.isError = false
      const res = await this.$authapi(['login', 'start', this.form.login])
      this.res = res
      if ('error' in res) {
        this.isError = true
      } else {
        this.isCompleted = true
        this.clearForm('login')
        const sid = res.sid
        if (process.env.mode === 'local') {
          this.addSid(sid)
          this.$router.push('/')
        } else {
          window.location = `/loggedin.cgi?sid=${sid}`
        }
      }
    },
  },
}
</script>

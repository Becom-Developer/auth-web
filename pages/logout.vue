<template>
  <b-container>
    <b-jumbotron header="logout" lead="auth-web: logout">
      <p>ログアウトの実行をします</p>
      <b-btn variant="primary" @click="$router.push('/')">トップへ戻る</b-btn>
    </b-jumbotron>
    <div>
      <b-card no-body>
        <b-tabs card class="text-center">
          <b-tab title="logout">
            <b-card-text>ログアウトの実行をします</b-card-text>
            <b-container fluid class="p-0">
              <b-card title="ログアウト実行" sub-title="Card subtitle">
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
                <b-btn block size="sm" @click="sendForm">ログアウト実行</b-btn>
                <b-alert
                  variant="success"
                  dismissible
                  :show="isCompleted"
                  @dismissed="isCompleted = false"
                  >ログアウトは成功しました。{{ res }}</b-alert
                >
                <b-alert
                  variant="danger"
                  dismissible
                  :show="isError"
                  @dismissed="isError = false"
                  >ログアウトは失敗しました。{{ res }}</b-alert
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
    ...mapState(['form', 'dummySid']),
    loginid: {
      get() {
        return this.form.logout.loginid
      },
      set(val) {
        this.addForm({ formKey: 'logout', row: { loginid: val } })
      },
    },
  },
  methods: {
    ...mapMutations(['addForm', 'clearForm', 'addSid']),
    async sendForm() {
      this.isCompleted = false
      this.isError = false
      let params = {
        ...this.form.logout,
      }
      if (process.env.mode === 'local' || process.env.mode === 'staging') {
        params = {
          ...params,
          sid: this.dummySid,
        }
      }
      const res = await this.$authapi(['login', 'end', params])
      this.res = res
      if ('error' in res) {
        this.isError = true
      } else if (res.status === 400) {
        this.isError = true
      } else {
        this.isCompleted = true
        this.clearForm('logout')
        if (process.env.mode === 'local' || process.env.mode === 'staging') {
          this.addSid('')
          this.$router.push('/')
        } else {
          window.location = `/loggedout.cgi`
        }
      }
    },
  },
}
</script>

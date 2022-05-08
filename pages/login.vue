<template>
  <b-container class="mb-5">
    <!-- ログインの説明 -->
    <div>
      <b-dropdown
        text="ログインの説明"
        block
        variant="danger"
        class="my-2"
        menu-class="w-100"
        size="lg"
      >
        <b-dropdown-text style="">
          ログインを実行するとwebapiを利用するためのkeyの発行などができます。
        </b-dropdown-text>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="/developers">開発者の方はこちら</b-dropdown-item>
      </b-dropdown>
    </div>
    <!-- ログイン入力フォーム -->
    <div class="mb-3">
      <b-card header="ユーザーログイン" header-tag="header" title="">
        <b-card-text>ログインの実行をします</b-card-text>
        <b-row class="my-1">
          <b-col sm="3" class="text-left">
            <label :for="`type-loginid`">loginid:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-loginid`"
              v-model="loginid"
              :type="`text`"
              :readonly="false"
              size="lg"
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
              :readonly="false"
              size="lg"
            ></b-form-input>
          </b-col>
        </b-row>
        <div v-if="isLoading">
          <b-alert class="text-center" variant="light" :show="isLoading">
            <b-spinner type="grow" small label="Small Spinning"></b-spinner>
            <b-spinner type="grow" small label="Small Spinning"></b-spinner>
            <b-spinner type="grow" small label="Small Spinning"></b-spinner>
          </b-alert>
        </div>
        <div v-else>
          <b-btn block size="lg" class="my-3" @click="sendForm"
            >ログイン実行</b-btn
          >
          <b-btn block size="lg" class="my-3" @click="clearForm"
            >入力値をクリア</b-btn
          >
        </div>
        <!-- 状況お知らせ -->
        <div class="text-center">
          <b-alert variant="success" :show="isCompleted"
            >ログインは成功しました</b-alert
          >
          <b-alert variant="warning" :show="hasValidError"
            >正しく入力してください</b-alert
          >
          <b-alert variant="danger" :show="hasError"
            >ログインは失敗しました<br />{{ res }}</b-alert
          >
        </div>
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
      hasError: false,
      hasValidError: false,
      isLoading: false,
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
    ...mapMutations(['addForm', 'addSid', 'addState']),
    async sendForm() {
      this.hasValidError = false
      this.isCompleted = false
      this.isLoading = true
      this.hasError = false
      if (this.form.login.loginid === '' && this.form.login.password === '') {
        this.hasValidError = true
        this.isLoading = false
        return
      }
      const res = await this.$authapi(['login', 'start', this.form.login])
      this.res = res
      if ('error' in res) {
        this.hasError = true
      } else {
        this.isCompleted = true
        this.addForm({ formKey: 'login', row: { loginid: '' } })
        this.addForm({ formKey: 'login', row: { password: '' } })
        const sid = res.sid
        if (process.env.mode === 'local') {
          this.addSid(sid)
          this.$router.push('/')
        } else {
          window.location = `/loggedin.cgi?sid=${sid}`
        }
        this.addState({ stateKey: 'loggedin', data: true })
      }
      this.isLoading = false
    },
    clearForm() {
      this.hasError = false
      this.hasValidError = false
      this.isCompleted = false
      this.addForm({ formKey: 'login', row: { loginid: '' } })
      this.addForm({ formKey: 'login', row: { password: '' } })
    },
  },
}
</script>

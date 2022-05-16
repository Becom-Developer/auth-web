<template>
  <b-container class="mb-5">
    <!-- ログアウトの説明 -->
    <div>
      <b-dropdown
        text="ログアウトの説明"
        block
        variant="danger"
        class="my-2"
        menu-class="w-100"
        size="lg"
      >
        <b-dropdown-text style="">
          新しくユーザーを作成したい場合はログアウトを実行してください。
        </b-dropdown-text>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="/developers">開発者の方はこちら</b-dropdown-item>
      </b-dropdown>
    </div>
    <!-- ログアウト入力フォーム -->
    <div class="mb-3">
      <b-card header="ログアウト" header-tag="header" title="">
        <b-card-text>ログアウトの実行をします</b-card-text>
        <!-- 特定のユーザーアクセスの場合はloginid直接指定のログアウト可能 -->
        <!-- <b-row class="my-1">
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
        </b-row> -->
        <div v-if="isLoading">
          <b-alert class="text-center" variant="light" :show="isLoading">
            <b-spinner type="grow" small label="Small Spinning"></b-spinner>
            <b-spinner type="grow" small label="Small Spinning"></b-spinner>
            <b-spinner type="grow" small label="Small Spinning"></b-spinner>
          </b-alert>
        </div>
        <div v-else>
          <b-btn block size="lg" class="my-3" @click="sendForm"
            >ログアウト実行</b-btn
          >
        </div>
        <!-- 状況お知らせ -->
        <div class="text-center">
          <b-alert variant="success" :show="isCompleted"
            >ログアウトは成功しました</b-alert
          >
          <b-alert variant="danger" :show="hasError"
            >ログアウトは失敗しました<br />{{ res }}</b-alert
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
      isLoading: false,
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
  async created() {
    await this.$authCheck()
  },
  methods: {
    ...mapMutations(['addForm', 'addSid', 'addAuth']),
    async sendForm() {
      this.isCompleted = false
      this.hasError = false
      let params = {
        ...this.form.logout,
      }
      if (process.env.mode === 'local') {
        params = {
          ...params,
          sid: this.dummySid,
        }
      }
      const res = await this.$authapi(['login', 'end', params])
      this.res = res
      if ('error' in res) {
        this.hasError = true
      } else if (res.status === 400) {
        this.hasError = true
      } else {
        this.isCompleted = true
        this.addForm({ formKey: 'logout', row: { loginid: '' } })
        if (process.env.mode === 'local') {
          this.addSid('')
          this.$router.push('/')
        } else {
          window.location = `/loggedout.cgi`
        }
        this.addAuth({ key: 'loggedin', val: false })
      }
    },
  },
}
</script>

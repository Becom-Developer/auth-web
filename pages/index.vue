<template>
  <b-container>
    <b-jumbotron
      header="auth-web"
      lead="auth-web: Account information management"
    >
      <p>ユーザー登録やwebapiキーの発行などを行います</p>
      <b-btn variant="primary" @click="$router.push('/')">トップへ戻る</b-btn>
    </b-jumbotron>
    <div>
      <b-card no-body>
        <b-tabs card class="text-center">
          <b-tab v-if="loggedin === false" title="signup">
            <b-card-text>ユーザー登録とログインの実行をします</b-card-text>
            <b-btn
              block
              variant="outline-secondary"
              @click="$router.push('/signup')"
              >signup</b-btn
            >
          </b-tab>
          <b-tab v-if="loggedin === false" title="login">
            <b-card-text>ユーザーログインをします</b-card-text>
            <b-btn
              block
              variant="outline-secondary"
              @click="$router.push('/login')"
              >login</b-btn
            >
          </b-tab>
          <b-tab v-if="loggedin" title="logout">
            <b-card-text>ユーザーログアウトをします</b-card-text>
            <b-btn
              block
              variant="outline-secondary"
              @click="$router.push('/logout')"
              >logout</b-btn
            >
          </b-tab>
          <b-tab v-if="loggedin" title="user">
            <b-card-text>登録ユーザー情報</b-card-text>
            <b-btn
              block
              variant="outline-secondary"
              @click="$router.push('/user')"
              >user</b-btn
            >
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['loggedin']),
  },
  async created() {
    const sid = 'aW5mb0BiZWNvbS5jby5qcDoyMDIyLTA0LTEzIDIzOjA5OjM3OjAwNzM='
    const res = await this.$authapi(['login', 'status', { sid }])
    this.addState({ stateKey: 'loggedin', data: false })
    if (res.status === 200) {
      this.addState({ stateKey: 'loggedin', data: true })
    }
  },
  methods: {
    ...mapMutations(['addState']),
  },
}
</script>

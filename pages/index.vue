<template>
  <b-container class="mb-5">
    <!-- アプリの説明 -->
    <div>
      <b-dropdown
        text="認証機能の使い方"
        block
        variant="danger"
        class="my-2"
        menu-class="w-100"
        size="lg"
      >
        <b-dropdown-text style="">
          webapiを利用するためのユーザー登録ができます。
        </b-dropdown-text>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="/developers">開発者の方はこちら</b-dropdown-item>
        <b-dropdown-item :href="reloadURL">強制的に再読み込み</b-dropdown-item>
      </b-dropdown>
    </div>
    <!-- サインアップ・新規登録 -->
    <div v-if="loggedin === false" class="mb-3">
      <b-card header="新規ユーザー登録" header-tag="header" title="">
        <b-card-text>新規ユーザー登録をします</b-card-text>
        <b-btn
          block
          variant="outline-secondary"
          size="lg"
          class="my-3"
          @click="$router.push('/signup')"
          >signup</b-btn
        >
      </b-card>
    </div>
    <!-- ログイン -->
    <div v-if="loggedin === false" class="mb-3">
      <b-card header="ユーザーログイン" header-tag="header" title="">
        <b-card-text>ユーザーログインをします</b-card-text>
        <b-btn
          block
          variant="outline-secondary"
          size="lg"
          class="my-3"
          @click="$router.push('/login')"
          >login</b-btn
        >
      </b-card>
    </div>
    <!-- ログアウト -->
    <div v-if="loggedin" class="mb-3">
      <b-card header="ユーザーログアウト" header-tag="header" title="">
        <b-card-text>ユーザーログアウトをします</b-card-text>
        <b-btn
          block
          variant="outline-secondary"
          size="lg"
          class="my-3"
          @click="$router.push('/logout')"
          >logout</b-btn
        >
      </b-card>
    </div>
    <!-- 登録ユーザー情報 -->
    <div v-if="loggedin" class="mb-3">
      <b-card header="登録ユーザー情報" header-tag="header" title="">
        <b-card-text>登録ユーザー情報</b-card-text>
        <b-btn
          block
          variant="outline-secondary"
          size="lg"
          class="my-3"
          @click="$router.push('/user')"
          >user</b-btn
        >
      </b-card>
    </div>
  </b-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['loggedin', 'dummySid']),
  },
  async created() {
    let sid = ''
    if (process.env.mode === 'local') {
      sid = this.dummySid
    }
    const res = await this.$authapi(['login', 'status', { sid }])
    this.addState({ stateKey: 'loggedin', data: false })
    if (res.status === 200) {
      this.addState({ stateKey: 'loggedin', data: true })
    }
  },
  mounted() {
    this.reloadURL = process.env.authWebURL
  },
  methods: {
    ...mapMutations(['addState', 'addSid']),
  },
}
</script>

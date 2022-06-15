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
        <b-dropdown-item href="/developers/">開発者の方はこちら</b-dropdown-item>
        <b-dropdown-item :href="reloadURL">強制的に再読み込み</b-dropdown-item>
      </b-dropdown>
    </div>
    <!-- メニュー -->
    <div class="mb-3">
      <b-card header="メニュー" header-tag="header" title="">
        <b-card-text>開発者向けメニュー</b-card-text>
        <b-btn
          block
          variant="outline-secondary"
          size="lg"
          class="my-3"
          @click="$router.push('/developers/')"
          >開発者向け</b-btn
        >
        <b-card-text>認証メニュー</b-card-text>
        <b-btn
          block
          variant="outline-secondary"
          size="lg"
          class="my-3"
          @click="$router.push('/auth/')"
          >認証メニュー</b-btn
        >
        <b-card-text>登録者メニュー</b-card-text>
        <b-btn
          block
          variant="outline-secondary"
          size="lg"
          class="my-3"
          @click="$router.push('/user/')"
          >登録者メニュー</b-btn
        >
        <b-card-text>個人情報メニュー</b-card-text>
        <b-btn
          block
          variant="outline-secondary"
          size="lg"
          class="my-3"
          @click="$router.push('/profile/')"
          >個人情報メニュー</b-btn
        >
        <b-card-text>apikeyメニュー</b-card-text>
        <b-btn
          block
          variant="outline-secondary"
          size="lg"
          class="my-3"
          @click="$router.push('/apikey/')"
          >apikeyメニュー</b-btn
        >
      </b-card>
    </div>








  </b-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      reloadURL: '',
    }
  },
  computed: {
    ...mapState(['dummySid', 'auth']),
  },
  async created() {
   await this.$authCheck()
  },
  mounted() {
    this.reloadURL = process.env.authWebURL
  },
  methods: {
    ...mapMutations(['addState', 'addSid', 'addAuth']),
  },
}
</script>

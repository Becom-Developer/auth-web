<template>
  <b-container>
    <b-jumbotron header="user" lead="auth-web: user">
      <p>登録ユーザー情報</p>
      <b-btn variant="primary" @click="$router.push('/')">トップへ戻る</b-btn>
    </b-jumbotron>
    <p>検索条件入力フォーム</p>
    <p>検索実行ボタン</p>
    <p>検索該当件数</p>
    <p>結果のリスト</p>
    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows2"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>

      <p class="mt-3">Current Page: {{ currentPage }}</p>

      <b-table
        id="my-table"
        :items="items2"
        :per-page="perPage"
        :current-page="currentPage"
        small
      ></b-table>
      <p :current-page="currentPage"></p>
    </div>

    <p>結果の詳細、編集、新規入力</p>

    <b-container>
      <b-row v-for="user in userList" :key="user.id" class="mb-1">
        <b-col cols="1">{{ user.id }}</b-col>
        <b-col>{{ user.loginid }}</b-col>
        <b-col cols="3">
          <b-btn block size="sm" @click="detailShow(user)">詳細</b-btn>
        </b-col>
      </b-row></b-container
    >

    <div>
      <b-card no-body>
        <b-tabs card class="text-center">
          <b-tab title="user">
            <b-card-text>登録ユーザー情報</b-card-text>
            <b-container fluid class="p-0">
              <b-card title="ユーザー情報一覧取得" sub-title="Card subtitle">
                <b-btn block size="sm" @click="getList">一覧取得実行</b-btn>
                <div>
                  <p>{{ detail }}</p>
                  <p>{{ detail.loginid }}</p>
                </div>
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
      detail: {},
      perPage: 1,
      currentPage: 1,
      items: [
        { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
        { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
        { id: 3, first_name: 'Barney', last_name: 'Rubble' },
        { id: 4, first_name: 'Betty', last_name: 'Rubble' },
        { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
        { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
        { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
        { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
        { id: 9, first_name: 'Pearl', last_name: 'Slaghoople' },
      ],
      items2: [],
    }
  },
  computed: {
    ...mapState(['form', 'loggedin', 'userList']),
    rows() {
      return this.items.length
    },
    rows2() {
      return this.items2.length
    },

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
  async created() {
    const sid = process.env.dummySid
    const res = await this.$authapi(['login', 'status', { sid }])
    this.addState({ stateKey: 'loggedin', data: false })
    if (res.status === 200) {
      this.addState({ stateKey: 'loggedin', data: true })
    } else {
      this.$router.push('/')
    }
  },
  mounted() {},
  methods: {
    ...mapMutations(['addForm', 'clearForm', 'addState']),
    detailShow(user) {
      console.log('show')
      this.detail = user
    },
    async getList() {
      console.log('getList')
      const sid = process.env.dummySid
      const res = await this.$authapi(['user', 'list', { sid }])
      console.log(res)
      this.addState({ stateKey: 'userList', data: res })
      const items2 = []
      for (const user of res) {
        items2.push({ id: user.id, loginid: user.loginid })
      }
      this.items2 = items2
    },
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
        window.location = `/loggedin.cgi?sid=${sid}`
      }
    },
  },
}
</script>

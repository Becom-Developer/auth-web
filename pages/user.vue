<template>
  <b-container>
    <b-jumbotron header="user" lead="auth-web: user">
      <p>登録ユーザー情報</p>
      <b-btn variant="primary" @click="$router.push('/')">トップへ戻る</b-btn>
    </b-jumbotron>
    <p>検索条件入力フォーム</p>
    <!-- 検索 -->
    <div class="mb-3">
      <b-card header="検索条件入力フォーム" header-tag="header" title="項目">
        <b-card-text>登録ユーザー情報</b-card-text>
        <b-btn block size="sm" @click="getList">一覧取得実行</b-btn>
      </b-card>
    </div>
    <!-- 検索結果リスト -->
    <div class="mb-3">
      <b-card header="検索結果" header-tag="header" title="項目">
        <b-card-text>結果のリスト</b-card-text>
        <div class="overflow-auto">
          <p class="mt-3">Current Page: {{ currentPage }}</p>
          <b-table
            id="my-table"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            :fields="['id', 'loginid', 'show_details']"
            small
            hover
          >
            <template #cell(show_details)="row">
              <b-btn size="sm" class="mr-2" @click="showDetail(row)">
                Details
              </b-btn>
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            align="center"
          ></b-pagination>
        </div>
        <div v-if="isDetail">
          <ul>
            <li
              v-for="col in [
                'id',
                'loginid',
                'password',
                'approved',
                'deleted',
                'created_ts',
                'modified_ts',
              ]"
              :key="col.id"
            >
              {{ col }}: {{ detail[col] }}
            </li>
          </ul>
        </div>
      </b-card>
    </div>
    <!-- 検索結果詳細 -->
    <div class="mb-3">
      <b-card
        header="結果の詳細、編集、新規入力"
        header-tag="header"
        title="項目"
      >
        <b-card-text>詳細</b-card-text>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      isDetail: false,
      isCompleted: false,
      isError: false,
      res: {},
      detail: {},
      perPage: 5,
      currentPage: 1,
      items: [],
    }
  },
  computed: {
    ...mapState(['form', 'loggedin', 'userList', 'dummySid']),
    rows() {
      return this.items.length
    },
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
    } else {
      this.$router.push('/')
    }
  },
  mounted() {},
  methods: {
    ...mapMutations(['addForm', 'clearForm', 'addState']),
    showDetail(row) {
      this.isDetail = true
      this.detail = row.item
    },
    async getList() {
      let sid = ''
      if (process.env.mode === 'local') {
        sid = this.dummySid
      }
      const res = await this.$authapi(['user', 'list', { sid }])
      this.addState({ stateKey: 'userList', data: res })
      const items = []
      for (const user of res) {
        items.push(user)
      }
      this.items = items
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

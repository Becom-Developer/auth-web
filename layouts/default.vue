<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="sticky-top">
      <b-navbar-brand style="cursor: pointer" @click="$router.push('/')"
        >auth - 認証機能&nbsp;<span v-if="auth.user.limitation === 100"
          ><b-badge variant="danger">管理者</b-badge></span
        ></b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
            v-if="auth.loggedin"
            :text="auth.user.loginid"
            right
          >
            <b-dropdown-item href="/logout">logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Nuxt />
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['loggedin', 'auth']),
  },
  methods: {},
}
</script>

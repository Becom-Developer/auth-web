<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="sticky-top">
      <b-navbar-brand style="cursor: pointer" @click="$router.push('/')"
        >auth - 認証機能</b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click="$router.push('/')">top</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto"> </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Nuxt />
  </div>
</template>
<script>
export default {
  methods: {},
}
</script>

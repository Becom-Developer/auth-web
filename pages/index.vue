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
          <b-tab title="signup">
            <b-card-text>ユーザー登録とログインの実行をします</b-card-text>
            <b-btn
              block
              variant="outline-secondary"
              @click="$router.push('/signup')"
              >signup</b-btn
            >
          </b-tab>
          <b-tab title="login">
            <b-card-text>ユーザーログインをします</b-card-text>
            <b-btn
              block
              variant="outline-secondary"
              @click="$router.push('/login')"
              >login</b-btn
            >
          </b-tab>
          <b-tab title="logout">
            <b-card-text>ユーザーログアウトをします</b-card-text>
            <b-btn
              block
              variant="outline-secondary"
              @click="$router.push('/logout')"
              >logout</b-btn
            >
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </b-container>
</template>

<script>
export default {}
</script>

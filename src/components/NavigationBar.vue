<template>
  <b-navbar class="main-navbar">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/dashboard'}">
        <b-icon
            icon="hand-holding-usd"
            size="is-large"
            type="is-primary">
        </b-icon>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/dashboard'}">
        Számlainformációk
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/payment'}">
        Fizetés
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <b-icon
            id="userIcon"
            icon="user"
            size="is-small"
            type="is-primary">
        </b-icon>
        <p id="username">{{this.$store.getters.getUsername}}</p>
        <b-navbar-item @click="logout">
          <b-icon
              icon="power-off"
              size="is-large"
              type="is-primary">
          </b-icon>
        </b-navbar-item>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    logout () {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>

</style>
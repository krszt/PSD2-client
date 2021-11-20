<template>
  <div class="main-layout">
    <div class="columns is-mobile is-centered mt-2">
      <div class="column is-9">
        <navigation-bar></navigation-bar>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>

  import NavigationBar from "@/components/NavigationBar";

  export default {
    name: "MainLayout",
    components: {NavigationBar}
  }
</script>

<style lang="scss">
  @import "../style/custom.scss";

  .main-layout {
    background: $background-color;
  }
</style>
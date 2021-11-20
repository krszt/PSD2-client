<template>
  <div class="columns is-mobile is-centered mt-6">
    <div class="column is-9">
      <div class="columns is-mobile">
        <div class="column is-5">
          <add-account-box></add-account-box>
        </div>
        <div class="column is-7">
          <account-info-box></account-info-box>
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-12">
          <account-tabs-box></account-tabs-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AddAccountBox from "@/components/dashboard/AddAccountBox";
import AccountInfoBox from "@/components/dashboard/AccountInfoBox";
import AccountTabsBox from "@/components/dashboard/AccountTabsBox";

export default {
  name: "Dashboard",
  components: {AddAccountBox, AccountInfoBox, AccountTabsBox}
}
</script>

<style scoped>

</style>
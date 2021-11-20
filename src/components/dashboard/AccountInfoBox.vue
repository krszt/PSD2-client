<template>
  <div class="box accountBox">
    <p class="box-title mb-5">Aktuális számlaadatok</p>
    <div class="columns is-mobile accountInfo">

      <div class="column is-6">
        <b-field class="labelLeft no-padding-top mb-5" label="IBAN:" horizontal custom-class="is-small" expanded><p>{{$store.getters.getAccountData.iban}}</p></b-field>
        <b-field class="labelLeft no-padding-top" label="Számlaszám:" horizontal custom-class="is-small" expanded><p>{{$store.getters.getAccountData.accountNumber}}</p></b-field>
      </div>
      <div class="column is-6">
        <b-field class="labelLeft no-padding-top mb-5" label="Pénznem:" horizontal custom-class="is-small" expanded><p>{{$store.getters.getAccountData.currency}}</p></b-field>
        <b-field class="labelLeft no-padding-top" label="Név:" horizontal custom-class="is-small" expanded><p>{{$store.getters.getAccountData.name}}</p></b-field>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "AccountBox"
}
</script>

<style scoped>

</style>
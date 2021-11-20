<template>
  <div class="box addAccountBox">
    <form class="add-iban-form" @submit.prevent="getConsent">
      <p class="box-title mb-5">Bankszámla hozzáadása</p>
      <b-field class="labelLeft" label="IBAN: " horizontal custom-class="is-small" expanded>
        <b-input v-model="iban" id="inputIban" size="is-small"></b-input>
      </b-field>
      <b-field class="labelLeft" label="Pinkód: " horizontal custom-class="is-small" expanded>
        <b-input v-model="password" id="inputpw" size="is-small"></b-input>
      </b-field>
      <b-button type="is-primary" native-type="submit" size="is-small">Adatok lekérése</b-button>
      <b-loading :active="loading"></b-loading>
    </form>
    <b-modal
        v-model="isComponentModalActive"
        :width="480"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal>
        <sca-modal></sca-modal>
    </b-modal>
  </div>
</template>

<script>
import ScaModal from "@/components/dashboard/ScaModal";

export default {

  name: "AddAccountBox",
  components: {ScaModal},
  data() {
    return {
      iban: '',
      password: '',
      username: this.$store.getters.getUsername,
      isComponentModalActive: false,
      loading: false
    }
  },
  methods: {
    async getConsent() {
      this.loading = true
      try {
        let data = {iban: this.iban, username: this.username, pinCode: this.password}
        await this.$store.dispatch('getConsent', data)
        this.loading = false
        this.isComponentModalActive = true
      }catch (e){
        this.$buefy.toast.open({
          message: "Ismeretlen hiba történt",
          type: 'is-danger'
        })
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
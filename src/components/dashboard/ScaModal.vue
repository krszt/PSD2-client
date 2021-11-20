<template>
  <form @submit.prevent="getAccountByIban">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Authentikáció</p>
        <button
            type="button"
            class="delete"
            @click="$emit('close')"/>
      </header>
      <section class="modal-card-body">
        <b-field label="Authentikációs kód">
          <b-input
              type="code"
              v-model="code"
              placeholder="Email-ben kapott kód"
              required>
          </b-input>
        </b-field>
        <p><a @click="getNewAuthCode">Új aktiváló kód kérése</a></p>
      </section>
      <footer class="modal-card-foot">
        <b-button type="is-primary" native-type="submit" size="is-small">Hitelesítés</b-button>
      </footer>
    </div>
    <b-loading :active="loading"></b-loading>
  </form>
</template>

<script>
export default {
  name: "SCAModal",
  data() {
    return {
      code: '',
      loading: false
    }
  },
  methods: {
    async getAccountByIban() {
      this.loading = true
      try {
        let data = {id: this.$store.getters.getAccountData.id, authCode: this.code};
        console.log(data);
        await this.$store.dispatch('getAccountById', data)
        if(this.$store.getters.getAccountAddResponseCode === 200){
          this.$buefy.toast.open({
            message: "A bankszámla hozzáadása sikeres",
            type: 'is-success'
          })
        }else if(this.$store.getters.getAccountAddResponseCode === 403) {
          this.$buefy.toast.open({
            message: "A bankszámla hozzáadása sikertelen<br>Nincs érvényes hozzájárulás",
            type: 'is-danger'
          })
        }else if(this.$store.getters.getAccountAddResponseCode === 400){
            this.$buefy.toast.open({
              message: "A bankszámla hozzáadása sikertelen<br>A megadott kód nem megfelelő",
              type: 'is-danger'
            })
        }else {
          this.$buefy.toast.open({
            message: "A bankszámla hozzáadása sikertelen<br>Rendszerhiba történt",
            type: 'is-danger'
          })
        }
        this.$parent.close()
      }catch (e){
        this.$buefy.toast.open({
          message: "A bankszámla hozzáadása sikertelen <br> Ismeretlen hiba történt",
          type: 'is-danger'
        })
      }finally {
        this.loading = false
      }
    },
    async getNewAuthCode() {
      this.loading = true
      try {
        await this.$store.dispatch('getNewAuthCode', this.$store.getters.getAccountData.id)}
      catch (e){
        console.log(e);
        this.$buefy.toast.open({
          message: "Ismeretlen hiba történt",
          type: 'is-danger'
        })
      }finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
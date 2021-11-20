<template>
  <div class="box accountBox">
    <p class="box-title mb-5 text-center">Fizetés</p>
    <div class="columns paymentInfo">
      <div class="column is-12">
        <b-field class="labelLeft" label="Kedvezményezett IBAN: " horizontal custom-class="is-small">
          <b-input v-model="inputDebtorIban" id="inputDebtorIban" size="is-small"></b-input>
        </b-field>
        <b-field class="labelLeft" label="Kedvezményezett neve: " horizontal custom-class="is-small">
          <b-input v-model="inputDebtorName" id="inputDebtorName" size="is-small"></b-input>
        </b-field>
      </div>
    </div>
    <div class="columns paymentInfo">
      <div class="column is-8">
        <b-field class="labelLeft" label="Pénznem: " horizontal custom-class="is-small" expanded>
          <b-select v-model="selectedCurrency" class="currencySelect" placeholder="Válassz pénznemet" size="is-small" >
            <option v-for="(currency, index) in getBalances" :key="index" :value="currency">{{currency}}</option>
          </b-select>
        </b-field>
      </div>
      <div class="column is-4">
        <b-field class="labelLeft" label="Egyenleg:" horizontal custom-class="is-small" expanded>
          {{getAmount + " " + selectedCurrency}}
        </b-field>
      </div>
    </div>
    <div class="columns paymentInfo">
      <div class="column">
        <b-field class="labelLeft" label="Összeg: " horizontal custom-class="is-small" expanded>
          <b-input v-model="inputAmount" id="inputAmount" size="is-small"></b-input>
        </b-field>
      </div>
    </div>
    <div class="columns paymentInfo">
      <div class="column is-6 is-offset-3">
        <b-button type="is-primary" size="is-small" expanded @click="sendPayment">Küldés</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPaymentBox",
  data() {
    return {
      inputDebtorIban: "",
      inputDebtorName: "",
      inputAmount: "",
      creditorIban: this.$store.getters.getAccountData.iban,
      selectedCurrency: null,
      username: this.$store.getters.getUsername,
      loading: false
    }
  },
  methods: {
    async sendPayment() {
      this.loading = true
      try {
        let data = {
          payment: {
            debtorIban: this.inputDebtorIban,
            ultimateDebtor: this.inputDebtorName,
            amount: this.inputAmount,
            creditorIban: this.$store.getters.getAccountData.iban,
            currency: this.selectedCurrency
          },
          username: this.username
        }

        console.log(data);

        await this.$store.dispatch('pay', data)
        if (this.$store.getters.getPaymentAddResponseCode === 200) {
          this.$buefy.toast.open({
            message: "A fizetés sikeres",
            type: 'is-success'
          })
        }
        await this.$store.dispatch('getPayments', this.$store.getters.getUsername)
      } catch (e) {
        this.$buefy.toast.open({
          message: "A fizetés sikertelen <br> Ismeretlen hiba történt",
          type: 'is-danger'
        })
      } finally {
        this.loading = false
        await this.$store.dispatch('getPayments', this.$store.getters.getUsername)
      }
    },
    formatMoney(amount, decimalCount = 2, decimal = ",", thousands = ".") {
      try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {
    getBalances() {
      let balances = this.$store.getters.getAccountData.balances
      let currencies = []

      for(let i = 0; i < balances.length; i++){
        currencies.push(this.$store.getters.getAccountData.balances[i].balanceAmount.currency)
      }
      console.log(currencies)
      return currencies;
    },
    getAmount(){
      let balances = this.$store.getters.getAccountData.balances
      let amount = "";

      for(let i = 0; i < balances.length; i++){
        if(this.selectedCurrency === this.$store.getters.getAccountData.balances[i].balanceAmount.currency) {
          amount = this.formatMoney(parseInt(this.$store.getters.getAccountData.balances[i].balanceAmount.amount), 0)
        }
      }
      return amount;
    }
  }
}
</script>

<style scoped>

</style>
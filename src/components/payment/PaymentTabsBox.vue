<template>
  <div class="box paymentTabsBox">
    <b-table
            :data="getPaymentData"
            :columns="paymentsColumns"
            :paginated="true"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-position="paginationPosition"
            :narrowed="true"
            :striped="true"
            :hoverable="true"
            :default-sort="['requestedDate', 'desc']"
            :default-sort-direction="'desc'"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            aria-next-label="Következő oldal"
            aria-previous-label="Előző oldal"
            aria-page-label="Oldal"
            aria-current-label="Aktuális oldal">
    </b-table>
  </div>
</template>

<script>
export default {
  name: "PaymentTableBox",
  data() {
    return {
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      defaultSortDirection: "desc",
      paginationPosition: 'bottom',
      perPage: 5,
      currentPage: 1,
      paymentsColumns: [
        {
          field: 'debtorIban',
          label: 'Fogadó IBAN száma',
          sortable: true
        },
        {
          field: 'debtor',
          label: 'Fogadó neve',
          sortable: true
        },
        {
          field: 'creditorIban',
          label: 'Küldő IBAN száma'
        },
        {
          field: 'creditor',
          label: 'Küldő neve'
        },
        {
          field: 'amount',
          label: 'Összeg'
        },
        {
          field: 'currency',
          label: 'Pénznem'
        },
        {
          field: 'requestedDate',
          label: 'Küldés dátuma'
        }
      ]
    }
  },
  methods: {
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
    getPaymentData() {
      let payments = this.$store.getters.getPaymentData
      for(let i = 0; i < payments.length; i++){
        payments[i].currency = this.$store.getters.getPaymentData[i].currency
        payments[i].amount = this.formatMoney(parseInt(this.$store.getters.getPaymentData[i].amount), 0)
        payments[i].debtorIban = this.$store.getters.getPaymentData[i].debtor.iban
        payments[i].debtor = this.$store.getters.getPaymentData[i].ultimateDebtor
        payments[i].creditorIban = this.$store.getters.getPaymentData[i].creditor.iban
        payments[i].creditor = this.$store.getters.getPaymentData[i].ultimateCreditor
        payments[i].requestedDate = this.$store.getters.getPaymentData[i].requestedDate
      }
      return payments
    }
  },
}
</script>

<style scoped>

</style>
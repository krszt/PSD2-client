<template>
  <div class="box accountTabsBox">
    <b-tabs class="block accountInfoTabs">
      <b-tab-item label="Egyenlegek">
        <b-table
            :data="getBalanceData"
            :columns="balancesColumns"
            :narrowed="true"
            :striped="true"
            :hoverable="true"
            :default-sort="['currency', 'desc']"
            :default-sort-direction="'desc'"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize">
        </b-table>
      </b-tab-item>
      <b-tab-item label="Tranzakciók">
        <b-table
            :data="getTransactionData"
            :columns="transactionColumns"
            :paginated="true"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-position="paginationPosition"
            :narrowed="true"
            :striped="true"
            :hoverable="true"
            :default-sort="['date', 'desc']"
            :default-sort-direction="'desc'"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            aria-next-label="Következő oldal"
            aria-previous-label="Előző oldal"
            aria-page-label="Oldal"
            aria-current-label="Aktuális oldal">
        </b-table>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: "AccountTableBox",
  data() {
    return {
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      defaultSortDirection: "desc",
      paginationPosition: 'bottom',
      perPage: 5,
      currentPage: 1,
      balancesColumns: [
        {
          field: 'amount',
          label: 'Összeg'
        },
        {
          field: 'currency',
          label: 'Pénznem',
          sortable: true,
        },
        {
          field: 'type',
          label: 'Típus'
        },
        {
          field: 'date',
          label: 'Dátum'
        }
      ],
      transactionColumns: [
        {
          field: 'ultCreditor',
          label: 'Küldő',
          sortable: true,
          width: '100'
        },
        {
          field: 'creditIban',
          label: 'Küldő IBAN',
          width: '200'
        },
        {
          field: 'ultDebtor',
          label: 'Fogadó',
          sortable: true,
          width: '100'
        },
        {
          field: 'debtorIban',
          label: 'Fogadó IBAN',
          width: '200'
        },
        {
          field: 'amount',
          label: 'Összeg',
          width: '100'
        },
        {
          field: 'currency',
          label: 'Pénznem',
          sortable: true,
          width: '100'
        },
        {
          field: 'status',
          label: 'Státusz',
          sortable: true,
          width: '120'
        },
        {
          field: 'date',
          label: 'Dátum',
          sortable: true,
          width: '120'
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
    getBalanceData() {
      let balances = this.$store.getters.getAccountData.balances
      for(let i = 0; i < balances.length; i++){
        balances[i].currency = this.$store.getters.getAccountData.balances[i].balanceAmount.currency
        balances[i].amount = this.formatMoney(parseInt(this.$store.getters.getAccountData.balances[i].balanceAmount.amount), 0)
        balances[i].type = this.$store.getters.getAccountData.balances[i].balanceType
        balances[i].date = this.$store.getters.getAccountData.balances[i].referenceDate
      }
      return balances
    },
    getTransactionData() {
      let transactions = this.$store.getters.getAccountData.transactions
      for(let i = 0; i < transactions.length; i++){
        transactions[i].ultCreditor = this.$store.getters.getAccountData.transactions[i].ultimateCreditor
        transactions[i].creditIban = this.$store.getters.getAccountData.transactions[i].creditorAccount.iban
        transactions[i].ultDebtor = this.$store.getters.getAccountData.transactions[i].ultimateDebtor
        transactions[i].debtorIban = this.$store.getters.getAccountData.transactions[i].debtorAccount.iban
        transactions[i].amount = this.formatMoney(parseInt(this.$store.getters.getAccountData.transactions[i].transactionAmount.amount), 0)
        transactions[i].currency = this.$store.getters.getAccountData.transactions[i].transactionAmount.currency
        transactions[i].status = this.$store.getters.getAccountData.transactions[i].status
        transactions[i].date = this.$store.getters.getAccountData.transactions[i].bookingDate
      }
      return transactions
    }
  }
}
</script>

<style scoped>

</style>
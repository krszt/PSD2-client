<template>
  <div class="columns is-mobile is-centered mt-6">
    <div class="column is-9">
      <div class="columns is-mobile">
        <div class="column is-5">
          <add-account-box></add-account-box>
        </div>
        <div class="column is-7">
          <add-payment-box></add-payment-box>
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-12">
          <payment-tabs-box></payment-tabs-box>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddPaymentBox from "@/components/payment/AddPaymentBox";
import PaymentTabsBox from "@/components/payment/PaymentTabsBox";
import AddAccountBox from "@/components/dashboard/AddAccountBox";

export default {
  name: "Dashboard",
  components: {AddPaymentBox, PaymentTabsBox, AddAccountBox}
}
</script>

<style scoped>

</style>
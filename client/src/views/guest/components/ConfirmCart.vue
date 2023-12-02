<template>
   <div class="row">
      <div class="col-10 bg-white p-4 rounded-3">
         <div>
            <h5>Pesanan anda sudah benar?</h5>
            <p class="m-0 lh-sm fs-sm">Anda tidak dapat mengubah detail pesanan setelah menlanjutkan ke halaman pembayaran. Tetap lanjutkan?</p>
         </div>
         <div class="d-flex column-gap-3 mt-3">
            <button class="bg-white border w-100 rounded-3 py-2 fs-sm fw-medium pointer" @click="store.setModal()">Cek Ulang</button>
            <button class="bg-navy text-white border w-100 rounded-3 py-2 fs-sm fw-medium pointer" @click="goToPayment">Ya, Lanjutkan</button>
         </div>
      </div>
   </div>
</template>

<script>
import { store } from "../../../utils/store";

export default {
   name: "Confirm Cart",
   data() {
      return {
         store,
      };
   },
   methods: {
      goToPayment() {
         store.setModal();
         this.$router.push("/checkout/payment");
      },
   },
};
</script>

<style></style>

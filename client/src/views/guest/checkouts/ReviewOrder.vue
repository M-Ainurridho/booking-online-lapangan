<template>
   <section id="review-order">
      <div class="row w-100">
         <div class="col-10 mx-auto my-3">
            <RouterLink to="/" class="display-4 text-decoration-none text-dark fw-medium">BOL</RouterLink>

            <div class="row mt-3">
               <div class="col-12">
                  <div class="d-flex">
                     <i class="bx bxs-lock fs-5 me-2"></i>
                     <div class="d-flex flex-row align-items-center fs-sm fw-medium">
                        <span class="order-number d-inline-block bg-dark text-white text-center fs-xs rounded-circle me-2">1</span>
                        Review Order <i class="bx bx-chevron-right mx-1"></i>
                     </div>
                     <div class="d-flex flex-row align-items-center fs-sm opacity-50">
                        <span class="order-number d-inline-block bg-dark text-white text-center fs-xs rounded-circle me-2">2</span>
                        Metode Pembayaran <i class="bx bx-chevron-right mx-1"></i>
                     </div>
                     <div class="d-flex flex-row align-items-center fs-sm opacity-50">
                        <span class="order-number d-inline-block bg-dark text-white text-center fs-xs rounded-circle me-2">3</span>
                        Order Selesai
                     </div>
                  </div>
               </div>
            </div>

            <div class="row">
               <div class="col-6 review-order-list"></div>
               <div class="col-6 cost-breakdown"></div>
            </div>
         </div>
      </div>
   </section>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
   components: { RouterLink },
};
</script>

<style scoped>
.order-number {
   width: 20px;
   height: 20px;
   line-height: 20px;
}
</style>

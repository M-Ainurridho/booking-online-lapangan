<template>
   <div class="offcanvas offcanvas-end px-4" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header border-bottom">
         <h5 class="offcanvas-title mx-auto" id="offcanvasNavbarLabel">JADWAL DIPILIH</h5>
         <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
         <div v-if="store.cart.schedules.length < 1">
            <p class="text-opacity-50 text-center fs-6">Belum ada jadwal di keranjang</p>
         </div>

         <div v-else v-for="cart in store.cart.schedules" :key="cart.fieldName">
            <h6 class="fw-semibold" style="margin-left: -10px !important">{{ cart.fieldName }}</h6>

            <div class="row cart-schedule bg-body-tertiary rounded-2 py-2 mb-3 overflow-hidden">
               <div class="col-12"></div>
               <div class="col-10">
                  <div class="row">
                     <div class="col-12 fw-medium">{{ cart.date }} <i class="bx bxs-circle d-inline-block" style="font-size: 5px !important; transform: translateY(-3px)"></i> {{ cart.start }} - {{ cart.end }}</div>
                     <div class="col-12">
                        {{ cart.price }}
                     </div>
                  </div>
               </div>
               <div class="col-2 my-auto"><i class="bx bx-trash-alt fs-4"></i></div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { store } from "../../../utils/store";

export default {
   data() {
      return {
         store,
      };
   },
};
</script>

<style scoped>
.cart-schedule {
   position: relative;
}
.cart-schedule::before {
   content: "";
   display: block;
   background-color: black !important;

   position: absolute;
   top: 0;
   bottom: 0;

   width: 5px;
}
</style>

<template>
   <div ref="offcanvas" class="offcanvas offcanvas-end px-4" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header border-bottom">
         <h5 class="offcanvas-title mx-auto" id="offcanvasNavbarLabel">JADWAL DIPILIH</h5>
         <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" @click="closeOffcanvas"></button>
      </div>
      <div class="offcanvas-body" style="display: grid">
         <div v-if="store.carts.length < 1">
            <p class="text-opacity-50 text-center fs-6">Belum ada jadwal di keranjang</p>
         </div>

         <div v-else>
            <div class="row" v-for="cart in store.carts" :key="cart._id">
               <h6 class="fw-semibold" style="margin-left: -10px !important">{{ cart.field }}</h6>
               <div class="col-12 cart-schedule bg-body-tertiary rounded-2 py-2 mb-3 overflow-hidden">
                  <div class="row">
                     <div class="col-10">
                        <div class="fw-medium">{{ cart.date }} <i class="bx bxs-circle d-inline-block" style="font-size: 5px !important; transform: translateY(-3px)"></i> {{ startHour(cart.start) }} - {{ endHour(cart.end) }}</div>
                        <div class="">
                           {{ printPrice(cart.price) }}
                        </div>
                     </div>
                     <div class="col-2 my-auto"><i class="bx bx-trash-alt fs-4 pointer" @click="deleteCart(cart._id)"></i></div>
                  </div>
               </div>
            </div>
         </div>

         <div v-show="store.carts.length > 0" style="align-self: self-end">
            <button @click="goToCheckout" class="bg-navy border text-white w-100 py-2 rounded-3 fw-medium">Selanjutnya</button>
         </div>
      </div>
   </div>
</template>

<script>
import { apiUrl } from "../config/const";
import { timeString, toRupiah } from "../utils";
import { store } from "../utils/store";

import axios from "axios";

export default {
   props: ["isShow"],
   emits: ["close-cart"],
   data() {
      return {
         store,
      };
   },
   watch: {
      isShow(newVal) {
         if (newVal) {
            this.$refs.offcanvas.classList.add("show");
         }
      },
   },
   methods: {
      startHour(time) {
         return timeString(time);
      },

      endHour(time) {
         return timeString(time);
      },

      printPrice(price) {
         return toRupiah(price);
      },

      async deleteCart(_id) {
         try {
            const response = await axios.delete(apiUrl(`user/cart/${_id}`));
            store.setCarts(response.data.payload);
         } catch (err) {
            console.log("error : " + err);
         }
      },

      goToCheckout() {
         this.closeOffcanvas();

         this.$router.push("/checkout/review-order");
      },
      closeOffcanvas() {
         this.$refs.offcanvas.classList.remove("show");
         this.$emit("close-cart");
      },
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
   left: 0;

   width: 5px;
}
</style>

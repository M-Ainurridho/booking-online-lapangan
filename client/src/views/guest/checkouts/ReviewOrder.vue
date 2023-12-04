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

            <div class="my-4 wrapper">
               <div class="review-order-list shadow p-4 rounded-3 w-100">
                  <div class="row">
                     <div class="col-12 border-bottom">
                        <h6 class="card-title fw-semibold">{{ store.carts.venue }}</h6>
                        <p class="card-text fs-sm">
                           <span class="text-warning me-2"><i class="bx bxs-star me-2"></i>{{ store.carts.rating }}</span>
                           <span><i class="bx bxs-circle me-2 fs-3xs"></i>{{ store.carts.address }}</span>
                        </p>
                     </div>
                  </div>

                  <div class="row" v-for="field in store.carts.fields" :key="field._id">
                     <div class="col-12 py-2 border-bottom">
                        <h6 class="card-title fw-medium">{{ field.name }}</h6>
                        <div class="d-flex justify-content-between">
                           <p class="m-0 fs-sm d-flex align-items-center"><i class="bx bxs-circle me-2 fs-3xs"></i>{{ field.added[0].date }}</p>
                           <p class="m-0 fs-sm text-opacity-50 pointer" @click="deleteCart(field._id)">[Hapus]</p>
                        </div>
                        <div class="cart-schedule bg-body-tertiary rounded-2 py-2 mb-2 overflow-hidden" v-for="added in field.added">
                           <div class="fs-sm px-3 d-flex justify-content-between">
                              <span>{{ printHour(added.start) }} - {{ printHour(added.end) }}</span>
                              <span>{{ printPrice(added.price) }}</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div class="row">
                     <div class="col-12">
                        <span class="fs-sm fw-semibold d-inline-block mt-2 pointer" @click="goToVenues"><i class="bx bx-arrow-back me-2"></i>Tambah Jadwal</span>
                     </div>
                  </div>
               </div>

               <!-- Rincian Biaya -->
               <div class="cost-breakdown shadow p-4 rounded-3 w-100">
                  <div class="row">
                     <div class="col-12 border-bottom border-dotted pb-2">
                        <h6 class="card-title fw-semibold"><i class="bx bx-play text-navy bg-navy-50 rounded-circle me-1"></i> Rincian Biaya</h6>
                     </div>
                  </div>

                  <div class="row">
                     <div class="col-12 border-bottom py-2">
                        <div class="d-flex justify-content-between fs-sm mb-2 fw-medium">
                           <span>Biaya Sewa</span>
                           <span>{{ rentalCost }}</span>
                        </div>
                        <div class="d-flex justify-content-between fs-sm mb-2 fw-medium">
                           <span>Biaya Produk Tambahan</span>
                           <span>Rp 0</span>
                        </div>
                        <div class="d-flex justify-content-between fs-sm mb-2 fw-medium">
                           <span>Biaya Layanan</span>
                           <span>Rp 5.000</span>
                        </div>
                     </div>
                  </div>

                  <div class="row">
                     <div class="col-12 border-bottom py-3">
                        <div class="d-flex justify-content-between fs-sm fw-medium">
                           <span>Total Bayar</span>
                           <span>{{ totalCosts }}</span>
                        </div>
                     </div>
                  </div>

                  <button class="w-100 border-0 bg-navy text-white py-2 mt-3 rounded-3 fw-medium fs-sm" @click="store.setModal('confirm-cart')">Lanjutkan Pembayaran</button>
               </div>
            </div>
         </div>
      </div>
   </section>

   <Modal />
</template>

<script>
import { RouterLink } from "vue-router";
import { store } from "../../../utils/store";
import { setTitle, timeString, toRupiah } from "../../../utils";
import { apiUrl } from "../../../config/const";

import Modal from "../../../components/Modal.vue";
import axios from "axios";

export default {
   name: "Review Order",
   components: { RouterLink, Modal },
   data() {
      return {
         store,
      };
   },
   created() {
      setTitle("Checkout - Review Order");
   },
   beforeUpdate() {
      !store.carts?.fields && this.$router.push("/venues");
   },
   methods: {
      printHour(time) {
         return timeString(time);
      },

      printPrice(price) {
         return toRupiah(price);
      },
      async deleteCart(_id) {
         try {
            const response = await axios.delete(apiUrl(`user/cart/field/${_id}`));
            store.setCarts(response.data.payload);
         } catch (err) {
            console.error(err);
         }
      },
      goToVenues() {
         this.$router.push("/venues");
      },
      allCosts() {
         const fields = store.carts?.fields;
         let costs = 0;

         if (fields) {
            for (let i = 0; i < fields.length; i++) {
               const reduce = fields[i].added.reduce((total, value) => value.price + total, 0);
               costs += reduce;
            }
         }

         return costs;
      },
   },
   computed: {
      rentalCost() {
         const costs = this.allCosts();
         return toRupiah(costs);
      },

      totalCosts() {
         const costs = this.allCosts() + 5000;
         return toRupiah(costs);
      },
   },
};
</script>

<style scoped>
.order-number {
   width: 20px;
   height: 20px;
   line-height: 20px;
}

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

.wrapper {
   display: grid !important;
   grid-template-columns: repeat(2, 1fr);
   gap: 24px;
}

.review-order-list,
.cost-breakdown {
   align-self: self-start;
}
</style>

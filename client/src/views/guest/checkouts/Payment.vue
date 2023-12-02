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
                     <div class="d-flex flex-row align-items-center fs-sm fw-medium">
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
               <!-- Data Penyewa -->
               <div class="tenant-data shadow p-4 rounded-3 w-100">
                  <div class="row">
                     <div class="col-12 border-bottom border-dotted pb-2">
                        <h6 class="card-title fw-semibold"><i class="bx bx-play text-navy bg-navy-50 rounded-circle me-1"></i> Data Penyewa</h6>
                     </div>
                  </div>

                  <div class="row">
                     <div class="col-12 mt-3">
                        <input type="email" v-model="inputFullname" class="form-control fs-sm py-2" placeholder="Nama Lengkap*" />
                     </div>
                     <div class="col-12 mt-3 d-flex column-gap-3">
                        <input type="tel" v-model="inputNoHp" class="form-control fs-sm py-2" placeholder="Nomor Telepon*" />
                        <input type="email" v-model="inputEmail" class="form-control fs-sm py-2" placeholder="Email*" />
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

import Modal from "../../../components/Modal.vue";

export default {
   name: "Checkout Payment",
   components: { RouterLink, Modal },
   data() {
      return {
         inputFullname: "",
         inputNoHp: "",
         inputEmail: "",
         store,
      };
   },
   created() {
      setTitle("Checkout - Payment Information");

      this.inputFullname = store.user?.fullname;
      this.inputNoHp = store.user?.noHp;
      this.inputEmail = store.user?.email;
   },
   methods: {
      printHour(time) {
         return timeString(time);
      },
      printPrice(price) {
         return toRupiah(price);
      },
      goToVenues() {
         this.$router.push("/venues");
      },
      allCosts() {
         const fields = store.carts.fields;
         let costs = 0;

         for (let i = 0; i < fields.length; i++) {
            const reduce = fields[i].added.reduce((total, value) => value.price + total, 0);
            costs += reduce;
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

.tenant-data,
.cost-breakdown {
   align-self: self-start;
}
</style>

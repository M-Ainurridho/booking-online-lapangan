<template>
   <div class="col-md-6 mx-auto overflow-y-scroll overflow-hidden">
      <div class="row bg-white rounded-2 p-4">
         <div class="col-12 mb-4">
            <div class="d-flex justify-content-between align-items-center">
               <h5 class="card-title fw-medium">Detail Booking</h5>
               <i class="bx bx-x close fw-bold fs-3 pointer" @click="store.setModal()"></i>
            </div>
         </div>

         <div class="col-12 shadow p-4 rounded-3 mb-4">
            <div class="d-flex align-items-center mb-3">
               <i class="bx bx-time bg-warning text-white rounded-circle" style="padding: 2px"></i>
               <h6 class="m-0 ms-1 fw-bold">Menunggu Pembayaran</h6>
            </div>
            <div class="pt-3 border-top d-flex">
               <div class="fs-xs w-100">
                  <h6 class="m-0 fs-xs text-opacity-50">ORDER ID</h6>
                  <span class="fw-semibold">{{ store.bookingDetail.orderId }}</span>
               </div>
               <div class="fs-xs w-100">
                  <h6 class="m-0 fs-xs text-opacity-50">TANGGAL BOOKING</h6>
                  <span class="fw-semibold">29 Nov 2023 - 11.25</span>
               </div>
               <div class="fs-xs w-100">
                  <h6 class="m-0 fs-xs text-opacity-50">TOTAL PEMBAYARAN</h6>
                  <span class="fw-semibold">{{ printPrice }}</span>
               </div>
            </div>
         </div>

         <div class="col-12 shadow p-4 rounded-3 mb-4">
            <div class="d-flex align-items-center">
               <i class="bx bx-play text-navy bg-navy-50 rounded-circle me-1"></i>
               <h6 class="m-0 fw-bold">Detail Booking</h6>
            </div>
            <p class="m-0 fs-xs">No Invoice -</p>
            <div class="border p-3 rounded-3">
               <h6 class="m-0 fs-sm fw-semibold">{{ store.bookingDetail.venue }}</h6>
               <div class="pb-2">
                  <p class="fs-sm m-0 text-opacity-75">{{ store.bookingDetail.address }}, {{ store.bookingDetail.city }}</p>
               </div>
               <div class="pt-2 border-top">
                  <p class="fs-sm m-0 p-0">{{ store.bookingDetail.field.name }}</p>
                  <div class="cart-schedule bg-body-tertiary rounded-2 py-2 mb-2 overflow-hidden">
                     <div class="fs-sm px-3 d-flex align-items-center">
                        <span>{{ store.bookingDetail.field.date }}</span>
                        <i class="bx bxs-circle fs-4xs mx-1 d-inline-block" style="transform: translateY(-1px);"></i>
                        <span>{{ startHour }} - {{ endHour }}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div class="col-12 shadow p-4 rounded-3 mb-4">
            <div class="d-flex align-items-center mb-3">
               <i class="bx bx-play text-navy bg-navy-50 rounded-circle me-1"></i>
               <h6 class="m-0 fw-bold">Ringkasan Pembayaran</h6>
            </div>
            <div class="pb-3">
               <h6 class="m-0 fs-sm mb-1">Biaya Sewa</h6>
               <div class="fs-sm d-flex">
                  <div class="flex-grow-1">
                     <i class="bx bx-play text-navy me-1"></i>
                     <span>{{ store.bookingDetail.field.name }}</span>
                  </div>
                  <div class=" fw-semibold">
                     {{ printPrice }}
                  </div>
               </div>
            </div>
            <div class="pb-3">
               <h6 class="m-0 fs-sm mb-2">Biaya Produk Tambahan</h6>
               <div class="fs-sm d-flex">
                  <div class="flex-grow-1">
                     Layanan Produk
                  </div>
                  <div class=" fw-semibold">
                     Rp 5.000
                  </div>
               </div>
            </div>
            <div class="pt-3 border-top">
               <div class="fs-sm d-flex">
                  <div class="flex-grow-1 fw-semibold">
                     Total bayar
                  </div>
                  <div class=" fw-semibold">
                     {{ totalPrice }}
                  </div>
               </div>
            </div>
         </div>

         <button class="border bg-navy py-2 rounded-3 text-white mb-2 fs-sm">Selesaikan Pembayaran</button>
      </div>
   </div>
</template>

<script>
import { timeString, toRupiah } from "../../../utils";
import { store } from "../../../utils/store";

export default {
   name: "Booking Detail",
   data() {
      return {
         store,
      };
   },
   computed: {
      startHour() {
         return timeString(store.bookingDetail.field.start);
      },
      endHour() {
         return timeString(store.bookingDetail.field.end);
      },

      printPrice() {
         return toRupiah(store.bookingDetail.field.price);
      },

      totalPrice() {
         return toRupiah(store.bookingDetail.field.price + 5000);
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

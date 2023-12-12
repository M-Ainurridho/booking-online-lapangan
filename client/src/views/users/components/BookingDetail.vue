<template>
   <div class="mx-auto overflow-y-auto overflow-hidden rounded-3" 
   :class="role == 'Admin' ? 'col-md-5' : store.booking.detail.status == 'Berhasil' ? 'col-md-8 my-auto' : 'col-md-8'">
      <div class="row bg-white rounded-2 p-4">
         <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
               <h5 class="card-title fw-medium">Detail Booking</h5>
               <i class="bx bx-x close fw-bold fs-3 pointer" @click="store.setModal()"></i>
            </div>
         </div>

         <div class="col-12 shadow p-4 rounded-3 mt-4">
            <div class="d-flex align-items-center mb-3">
               <i
                  class="bx text-white rounded-circle"
                  :class="store.booking.detail.status == 'Menunggu Pembayaran' ? 'bg-secondary bx-time' : store.booking.detail.status == 'Menunggu Konfirmasi' ? 'bg-warning bx-time' : 'bg-success bx-check'"
                  style="padding: 2px"
               ></i>
               <h6 class="m-0 ms-1 fw-bold">{{ store.booking.detail.status }}</h6>
            </div>
            <div class="pt-3 border-top d-flex">
               <div class="fs-xs w-100">
                  <h6 class="m-0 fs-xs text-opacity-50">ORDER ID</h6>
                  <span class="fw-semibold">{{ store.booking.detail.orderId }}</span>
               </div>
               <div class="fs-xs w-100">
                  <h6 class="m-0 fs-xs text-opacity-50">TANGGAL BOOKING</h6>
                  <span class="fw-semibold">29 Nov 2023 - 11.25</span>
               </div>
               <div class="fs-xs w-100">
                  <h6 class="m-0 fs-xs text-opacity-50">TOTAL PEMBAYARAN</h6>
                  <span class="fw-semibold">{{ totalPrice }}</span>
               </div>
            </div>
         </div>

         <div v-if="role == 'Admin'" class="mt-4">
            <h5>- Bukti Pembayaran</h5>
            <a :href="imgSrc" target="_blank">
               <img ref="imageInfo" :src="`/src/assets/images/bukti_pembayaran/${store.booking.detail.imageProof}`" alt="" class="img-thumbnail w-100" />
            </a>
            <div class="d-flex column-gap-2 mt-2">
               <button class="w-100 border py-2 rounded-3 bg-danger text-white" @click="detailConfirm('X')">Decline</button>
               <button class="w-100 border py-2 rounded-3 bg-success text-white" @click="detailConfirm('O')">Confirm</button>
            </div>
         </div>

         <div v-if="role == 'Member'" class="col-12 shadow p-4 rounded-3 mt-4">
            <div class="d-flex align-items-center">
               <i class="bx bx-play text-navy bg-navy-50 rounded-circle me-1"></i>
               <h6 class="m-0 fw-bold">Detail Booking</h6>
            </div>
            <p class="m-0 fs-xs">No Invoice -</p>
            <div class="border p-3 rounded-3">
               <h6 class="m-0 fs-sm fw-semibold">{{ store.booking.detail.venue }}</h6>
               <div class="pb-2">
                  <p class="fs-sm m-0 text-opacity-75">{{ store.booking.detail.address }}, {{ store.booking.detail.city }}</p>
               </div>
               <div class="pt-2 border-top">
                  <p class="fs-sm m-0 p-0">{{ store.booking.detail.field.name }}</p>
                  <div class="cart-schedule bg-body-tertiary rounded-2 py-2 mb-2 overflow-hidden">
                     <div class="fs-sm px-3 d-flex align-items-center">
                        <span>{{ store.booking.detail.field.date }}</span>
                        <i class="bx bxs-circle fs-4xs mx-1 d-inline-block" style="transform: translateY(-1px)"></i>
                        <span>{{ startHour }} - {{ endHour }}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div class="row mt-4" v-if="store.booking.detail.status != 'Berhasil' && role == 'Member'">
            <div class="col-7 shadow p-4 rounded-3">
               <div class="d-flex align-items-center mb-3">
                  <i class="bx bx-play text-navy bg-navy-50 rounded-circle me-1"></i>
                  <h6 class="m-0 fw-bold">Ringkasan Pembayaran</h6>
               </div>
               <div class="pb-3">
                  <h6 class="m-0 fs-sm mb-1">Biaya Sewa</h6>
                  <div class="fs-sm d-flex">
                     <div class="flex-grow-1">
                        <i class="bx bx-play text-navy me-1"></i>
                        <span>{{ store.booking.detail.field.name }}</span>
                     </div>
                     <div class="fw-semibold">
                        {{ printPrice }}
                     </div>
                  </div>
               </div>
               <div class="pb-3">
                  <h6 class="m-0 fs-sm mb-2">Biaya Produk Tambahan</h6>
                  <div class="fs-sm d-flex">
                     <div class="flex-grow-1">Layanan Produk</div>
                     <div class="fw-semibold">Rp 5.000</div>
                  </div>
               </div>
               <div class="pt-3 border-top">
                  <div class="fs-sm d-flex">
                     <div class="flex-grow-1 fw-semibold">Total bayar</div>
                     <div class="fw-semibold">
                        {{ totalPrice }}
                     </div>
                  </div>
               </div>
            </div>

            <div class="col-5">
               <h5>- Bukti Pembayaran</h5>
               <a :href="imgSrc" target="_blank">
                  <img ref="imageInfo" :src="`/src/assets/images/bukti_pembayaran/${store.booking.detail.imageProof}`" alt="" class="img-thumbnail w-100" />
               </a>
               <div v-if="store.booking.detail.status == 'Menunggu Pembayaran'">
                  <small class="me-1">Allow ext: (jpg, jpeg, png) & max: 1mb</small>
                  <small v-if="errors.status" v-for="err in errors.data" class="text-danger fs-italic">
                     {{ err.msg }}
                  </small>
                  <div class="input-group mb-3 mt-2">
                     <input type="file" ref="uploadBukti" class="form-control" id="inputGroupFile02" @change="uploadImg" />
                  </div>
               </div>
            </div>
         </div>

         <button v-if="store.booking.detail.status == 'Menunggu Pembayaran'" class="border bg-navy py-2 rounded-3 text-white mt-4 fs-sm" @click="submitPayment">Upload Pembayaran</button>
      </div>
   </div>
</template>

<script>
import { apiUrl } from "../../../config/const";
import { timeString, toRupiah } from "../../../utils";
import { store } from "../../../utils/store";

import axios from "axios";

export default {
   name: "Booking Detail",
   data() {
      return {
         imgSrc: "",
         store,
         errors: {
            status: false,
            data: [],
         },
         loading: false,
         role: "",
      };
   },
   created() {
      this.role = this.$route.name.split(" ")[0];
   },
   computed: {
      startHour() {
         return timeString(store.booking.detail.field.start);
      },
      endHour() {
         return timeString(store.booking.detail.field.end);
      },

      printPrice() {
         return toRupiah(store.booking.detail.field.price);
      },

      totalPrice() {
         return toRupiah(store.booking.detail.field.price + 5000);
      },
   },
   mounted() {
      if (this.$refs.imageInfo) {
         this.imgSrc = this.$refs.imageInfo.src;
      }
   },
   methods: {
      async submitPayment() {
         this.loading = !this.loading;

         const data = new FormData();
         data.append("image", this.$refs.uploadBukti.files[0]);

         try {
            const response = await axios.patch(apiUrl(`user/booking/upload-bukti/${store.booking.detail._id}`), data);
            this.errors.status = false;
            store.setBooking(response.data.payload);
            store.setModal();
         } catch (err) {
            this.errors.status = true;
            this.errors.data = err.response.data.errors;
            this.loading = !this.loading;
         }
      },
      async detailConfirm(char) {
         try {
            const { data } = await axios.patch(apiUrl(`user/booking/${store.booking.detail._id}/${char}`));

            const filtered = data.payload.filter((booked) => booked.status == "Menunggu Konfirmasi");
            store.setBooking(filtered);
            store.setModal();
         } catch (err) {
            console.error(err);
         }
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

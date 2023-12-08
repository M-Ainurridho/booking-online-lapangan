<template>
   <UserLayout>
      <BreadCrumbs />
      <div class="row my-5">
         <div class="col-8 mx-auto shadow rounded-3 p-4">
            <h5 class="fw-bold">Dasbor</h5>

            <div class="row my-3">
               <div class="col-12 mt-2 mb-4">
                  <div class="border-bottom">
                     <span v-for="menu in store.userMenu.menu" class="d-inline-block pointer px-5 py-1 rounded-top" :class="currentMenu === menu ? 'activeMenu' : 'text-opacity-50'" @click="changeUserMenu(menu)">
                        {{ menu }}
                     </span>
                  </div>
               </div>
               <div class="col-12">
                  <div class="d-flex column-gap-2">
                     <span v-for="status in store.userMenu.status" class="border py-2 px-3 rounded-3 pointer" :class="currentStatus === status ? 'activeStatus' : ''" @click="changeStatus(status)">{{ status }}</span>
                  </div>
               </div>
            </div>

            <div class="row" v-if="booking.length < 1">
               <div class="col-12 d-flex flex-column justify-content-center align-items-center">
                  <img src="../../assets/images/icons/document.png" alt="" class="h-25" />
                  <div class="row mt-3">
                     <div class="col-12 text-center">
                        <h5 class="card-title">Belum ada booking</h5>
                        <p class="text-text fs-sm">Lapangan yang kamu booking bakal muncul disini, ya.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div v-else v-for="bk in booking" :key="bk._id" class="row booking px-3 mb-3">
               <div class="col-12 border p-4 rounded-3 shadow-sm pointer" @click="bookingDetailModal(bk._id)">
                  <div class="booking-status">
                     <h6 class="mb-3 text-opacity-50">
                        {{ bk.status }} <span class="fs-sm ms-2">/bk/{{ bk.orderId }}</span>
                     </h6>
                  </div>
                  <div class="d-flex">
                     <div class="booking-time ps-2 pe-3 border-end d-flex flex-column justify-content-between">
                        <span>{{ printHour(bk.field.start) }}</span>
                        <span class="text-center">-</span>
                        <span>{{ printHour(bk.field.end) }}</span>
                     </div>
                     <div class="booking-field ps-4 w-100">
                        <div class="">
                           <h5 class="card-title">{{ bk.venue }}</h5>
                           <p class="m-0 fs-sm">{{ bk.field.name }} - {{ bk.field.date }}</p>
                        </div>
                        <div class="text-navy text-end fw-semibold fs-6 d-flex align-items-center justify-content-end">Lihat detail</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </UserLayout>
</template>

<script>
import UserLayout from "../../layouts/UserLayout.vue";
import BreadCrumbs from "../guest/components/BreadCrumbs.vue";

import axios from "axios";
import { store } from "../../utils/store";
import { apiUrl } from "../../config/const";
import { timeString } from "../../utils";

export default {
   name: "Dashboard",
   components: { UserLayout, BreadCrumbs },
   data() {
      return {
         currentMenu: "",
         currentStatus: "",
         booking: [],
         store,
      };
   },
   created() {
      this.currentMenu = "Booking";
      this.currentStatus = "Semua Status";

      this.fetchBooking();

      this.store.setUserMenu("Booking");
   },
   methods: {
      async changeUserMenu(menu) {
         this.currentMenu = menu;

         if (this.currentMenu == "Booking") {
            this.fetchBooking();
         } else {
            this.booking = [];
         }

         store.setUserMenu(menu);
      },

      changeStatus(status) {
         this.currentStatus = status;

         this.fetchBooking();
      },
      printHour(time) {
         return timeString(time);
      },

      async fetchBooking() {
         try {
            const response = await axios.get(apiUrl(`user/booking/${store.user._id}/${this.currentStatus}`));
            this.booking = response.data.payload;
         } catch (err) {
            console.error(err);
         }
      },

      bookingDetailModal(_id) {
         const found = this.booking.find((bk) => bk._id == _id);
         store.setDetailBooking(found);
         store.setModal("booking-detail");
      },
   },
};
</script>

<style scoped>
.activeMenu {
   position: relative;
   font-weight: 500;
}
.activeMenu::before {
   content: "";
   display: block;
   background-color: #000080;

   position: absolute;
   left: 0;
   right: 0;
   bottom: -2px;

   height: 2px;
   margin: 0 auto;
   animation: activeBar 0.5s;
}

.activeStatus {
   background-color: #000080;
   color: white;
}

.booking {
   position: relative;
}

.booking::before {
   content: "";
   display: block;

   position: absolute;

   left: 16px;
   top: 25px;
   width: 6px;
   height: 18px;

   background-color: orange;

   border-top-right-radius: 5px;
   border-bottom-right-radius: 5px;
}

.booking > div:hover {
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3) !important;
   transition: 0.3s;
}

.booking-field {
   display: grid;
   grid-template-columns: 4fr 1fr;
}
</style>

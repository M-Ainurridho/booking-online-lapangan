<template>
   <UserLayout>
      <BreadCrumbs />
      <div class="row my-5">
         <div class="col-8 mx-auto shadow rounded-3 p-4">
            <h5 class="fw-bold">Admin</h5>

            <div class="row my-4">
               <div class="col-3">
                  <p class="m-0 fs-6 pointer" :class="activeComp == comp ? 'fw-bold' : ''" v-for="({ name, comp }, i) in menus" :key="i" @click="activeComp = comp">
                     {{ name }}
                  </p>
               </div>
               <div class="col-9">
                  <component :is="activeComp"></component>
               </div>
            </div>
         </div>
      </div>
   </UserLayout>
</template>

<script>
import UserLayout from "../../../layouts/UserLayout.vue";
import BreadCrumbs from "../../guest/components/BreadCrumbs.vue";
import PaymentConfirmation from "./components/PaymentConfirmation.vue";
import DataVenues from "./components/DataVenues.vue";

import { store } from "../../../utils/store";
export default {
   name: "Admin Access",
   components: {
      UserLayout,
      BreadCrumbs,
      "payment-confirmation": PaymentConfirmation,
      "data-venues": DataVenues,
   },
   data() {
      return {
         menus: [
            {
               name: "Dashboard",
               comp: "dashboard",
            },
            {
               name: "Data Venues",
               comp: "data-venues",
            },
            {
               name: "Konfirmasi Pembayaran",
               comp: "payment-confirmation",
            },
         ],
         activeComp: "dashboard",
         store,
      };
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
</style>

<template>
   <UserLayout>
      <BreadCrumbs />
      <div class="row my-5">
         <div class="col-6 mx-auto shadow rounded-3 p-4">
            <h5 class="fw-bold">Profil</h5>

            <div class="row my-4">
               <div class="col-3">
                  <p class="m-0 fs-6 pointer" :class="activeComp == 'personal-data' ? 'fw-bold' : ''" @click="activeComp = 'personal-data'">Data Diri</p>
                  <p class="m-0 fs-6 pointer" :class="activeComp == 'change-password' ? 'fw-bold' : ''" @click="activeComp = 'change-password'">Ubah kata Sandi</p>
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
import UserLayout from "../../layouts/UserLayout.vue";
import BreadCrumbs from "../guest/components/BreadCrumbs.vue";
import PersonalData from "./components/PersonalData.vue";
import ChangePassword from "./components/ChangePassword.vue";

import { store } from "../../utils/store";

export default {
   name: "User Profile",
   components: {
      UserLayout,
      BreadCrumbs,
      "personal-data": PersonalData,
      "change-password": ChangePassword,
   },
   data() {
      return {
         activeComp: "personal-data",
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

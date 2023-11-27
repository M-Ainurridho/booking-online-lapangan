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
         </div>
      </div>
   </UserLayout>
</template>

<script>
import UserLayout from "../../layouts/UserLayout.vue";
import BreadCrumbs from "../guest/components/BreadCrumbs.vue";
import { store } from "../../utils/store";

export default {
   name: "Dashboard",
   components: { UserLayout, BreadCrumbs },
   data() {
      return {
         currentMenu: "",
         currentStatus: "",
         store,
      };
   },
   created() {
      this.currentMenu = "Booking";
      this.currentStatus = "Semua Status";
      store.setUserMenu("Booking");
   },
   methods: {
      changeUserMenu(menu) {
         this.currentMenu = menu;
         store.setUserMenu(menu);
      },
      changeStatus(status) {
         this.currentStatus = status;
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
</style>

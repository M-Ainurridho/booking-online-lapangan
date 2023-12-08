<template>
   <section id="modal" v-if="store.modal" class="d-flex align-items">
      <component :is="store.modalName"></component>
   </section>
</template>

<script>
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import ConfirmCart from "../views/guest/components/ConfirmCart.vue";
import BookingDetail from "../views/users/components/BookingDetail.vue";

import { store } from "../utils/store";

export default {
   props: ["modalName"],
   components: {
      login: Login,
      register: Register,
      "confirm-cart": ConfirmCart,
      "booking-detail": BookingDetail,
   },
   data() {
      return {
         store,
      };
   },
};
</script>

<style scoped>
#modal {
   position: fixed;
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;

   z-index: 999;

   background-color: rgba(0, 0, 0, 0.5);
}

.close {
   cursor: pointer;
}
</style>

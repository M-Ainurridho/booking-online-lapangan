<template>
   <section id="modal" v-if="store.modal" class="d-flex align-items">
      <div class="col-md-4 mx-auto my-auto">
         <div class="row">
            <div class="col-11 bg-white rounded-2 py-3">
               <component :is="store.modalName"></component>
            </div>
            <div class="col-md-1"><i class="bx bx-x close text-white fw-bold fs-3" @click="store.setModal()"></i></div>
         </div>
      </div>
   </section>
</template>

<script>
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import { store } from "../utils/store";

export default {
   props: ["modalName"],
   components: { login: Login, register: Register },
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

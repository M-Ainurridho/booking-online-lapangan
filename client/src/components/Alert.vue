<template>
   <div class="alert text-white d-flex justify-content-between align-items-center py-2 px-3 fw-medium shadow" :class="store.alert.statusCode != 200 ? 'bg-danger' : 'bg-success'">
      <span>{{ store.alert.message }}</span>
      <i class="bx bx-x fs-4 pointer" @click="store.setAlert(false)"></i>
   </div>
</template>

<script>
import { store } from "../utils/store";

export default {
   data() {
      return {
         store,
      };
   },
   mounted() {
      setTimeout(() => {
         store.setAlert(false);
      }, 3000);
   },
};
</script>

<style>
.alert {
   position: fixed;
   bottom: 0;
   left: 38%;
   right: 38%;

   z-index: 100;

   animation: 0.3s show ease-in;
}
</style>

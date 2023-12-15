<template>
   <slot name="header"></slot>

   <slot name="main"> </slot>

   <div v-if="store.alert.status">
      <Alert />
   </div>
   <slot name="modal"></slot>
   <slot name="footer"></slot>
</template>

<script>
import Alert from "../components/Alert.vue";
import { exchangeToken } from "../utils";
import { store } from "../utils/store";

export default {
   name: "Layout",
   components: { Alert },
   data() {
      return {
         store,
      };
   },
   created() {
      if (localStorage.getItem("martoken") && store.auth === false) {
         exchangeToken();
      }
   },
};
</script>

<style></style>

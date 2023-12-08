<template>
   <Layout>
      <template #header>
         <Navbar />
      </template>

      <template #main>
         <main>
            <slot></slot>
         </main>
      </template>

      <template #modal>
         <Modal />
      </template>
   </Layout>
</template>

<script>
import Modal from "../components/Modal.vue";
import Navbar from "../components/Navbar.vue";
import { store } from "../utils/store";

export default {
   components: { Navbar, Modal },
   data() {
      return {
         store,
      };
   },
   created() {
      store.auth === false && this.$router.push("/");
   },
};
</script>

<style>
main {
   margin-top: 65px !important;
   max-width: 100%;
   overflow-x: hidden;
}
</style>

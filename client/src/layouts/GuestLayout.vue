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

      <template #footer>
         <footer></footer>
      </template>
   </Layout>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Modal from "../components/Modal.vue";

import axios from "axios";
import { apiUrl } from "../config/const";

export default {
   components: { Navbar, Modal },
   name: "Guest Layout",
   async created() {
      const response = await axios.delete(apiUrl("user/booking"));
   },
};
</script>

<style>
main {
   margin-top: 63px !important;
   max-width: 100%;
   overflow-x: hidden;
}
</style>

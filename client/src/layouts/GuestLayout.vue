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
import { RouterLink } from "vue-router";
import Navbar from "../views/guest/components/Navbar.vue";
import Modal from "../components/Modal.vue";

export default {
   components: { Navbar, RouterLink, Modal },
};
</script>

<style>
main {
   margin-top: 63px !important;
   max-width: 100%;
   overflow-x: hidden;
}
</style>

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
   </Layout>
</template>

<script>
import Navbar from "../views/auth/components/Navbar.vue";

export default {
   components: { Navbar },
};
</script>

<style>
main {
   margin-top: 65px !important;
   max-width: 100%;
   overflow-x: hidden;
}
</style>

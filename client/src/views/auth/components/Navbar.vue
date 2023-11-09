<template>
   <nav class="navbar fixed-top navbar-expand-lg bg-white border-bottom px-3 bg-navy p-2">
      <div class="col-1 mx-auto">
         <RouterLink to="/" class="navbar-brand">
            <img src="../../../assets/images/icons/logotype.png" alt="brand" class="" />
         </RouterLink>
      </div>
   </nav>
</template>

<script>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.navbar {
   z-index: 999;
}
.navbar-brand img {
   height: 40px;
}
</style>

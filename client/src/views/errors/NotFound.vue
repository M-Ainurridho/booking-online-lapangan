<template>
   <div class="text-center">
      <h1 class=" my-3">404, Not Found</h1>
      <RouterLink to="/">back</RouterLink>
   </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
   name: "Not Found",
   components: { RouterLink },
};
</script>

<style></style>

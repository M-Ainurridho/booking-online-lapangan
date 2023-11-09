<template>
   <section id="navy-banner" class="bg-navy w-100 d-flex justify-content-center align-items-center">
      <slot></slot>
   </section>
</template>

<script>
export default {
   name: "Banner",
};
</script>

<style scoped>
#navy-banner {
   height: 225px;
}
</style>

<template>
   <div class="loading mx-auto" :class="color" :style="{ width: `${size}`, height: `${size}`, borderWidth: `${thick}` }"></div>
</template>

<script>
export default {
   props: ["size", "color", "thick"],
};
</script>

<style scoped>
.loading {
   border-radius: 50%;

   border-style: solid;
   border-left-color: transparent !important;

   animation: spin 1s infinite;
}
</style>

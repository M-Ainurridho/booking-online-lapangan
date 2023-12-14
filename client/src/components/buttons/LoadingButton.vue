<template>
   <button type="submit" v-if="loading" class="border w-100 bg-body-secondary py-2 rounded-2 text-white" disabled>
      <Loading size="20px" color="border-secondary" thick="3px" />
   </button>
   <button type="submit" v-else class="border-0 w-100 bg-navy py-2 rounded-2 text-white">{{ btnText }}</button>
</template>

<script>
import Loading from "../Loading.vue";

export default {
   props: ["btnText", "loading"],
   components: {
      Loading,
   },
};
</script>

<style></style>

<template>
   <section id="breadcrumbs" class="bg-navy">
      <div class="row">
         <div class="col-lg-9 mx-auto">
            <p class="fs-6 text-white">
               <slot></slot>
               <span>{{ venueName }}</span>
            </p>
         </div>
      </div>
   </section>
</template>

<script>
import venues from "../../../utils/data";

export default {
   name: "BreadCrumbs",
   data() {
      return {
         venueName: null,
      };
   },
   created() {
      const { id } = this.$route.params;
      const venue = venues.find((v) => v.id == id && v.name);
      this.venueName = venue.name;
   },
};
</script>

<style>
#breadcrumbs {
   height: 40px;
}

p {
   line-height: 40px;
}
</style>

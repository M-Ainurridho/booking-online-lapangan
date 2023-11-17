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
export default {
   name: "BreadCrumbs",
   props: ["venueName"],
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

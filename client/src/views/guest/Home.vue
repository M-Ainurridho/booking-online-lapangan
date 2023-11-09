<template>
   <GuestLayout #default>
      <section id="hero">
         <div class="row w-100 h-100 px-3">
            <div class="col-lg-9 mx-auto my-auto">
               <div class="row">
                  <div class="col-12 col-md-6 text-white">
                     <h1 class="fw-bolder">Super Sport Community App</h1>
                     <p>Platform all-in-one untuk sewa lapangan, cari lawan sparring, atau cari kawan main bareng. Olahraga makin mudah dan menyenangkan!</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <button @click="goToDashboard">dahboard</button>
   </GuestLayout>
</template>

<script>
import GuestLayout from "../../layouts/GuestLayout.vue";
import { setTitle } from "../../utils";

export default {
   name: "Home",
   components: { GuestLayout },
   methods: {
      goToDashboard() {
         this.$router.push("/dashboard");
      },
   },
   created() {
      setTitle("BOL - Super Sport Community App");
   },
};
</script>

<style>
#hero {
   background-image: url("../../assets/images/backgrounds/hero.jpg");
   background-size: cover;
   width: 100%;
   height: 600px;
   position: relative;

   z-index: 1;
}

#hero::after {
   content: "";
   display: block;

   position: absolute;
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;

   background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
   z-index: -1;
}

#hero h1 {
   font-size: 64px;
}

p {
   font-size: 18px;
}

@media screen and (max-width: 768px) {
   #hero {
      background-position: 75%;
   }
}
</style>

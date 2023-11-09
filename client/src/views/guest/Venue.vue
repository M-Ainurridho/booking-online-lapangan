<template>
   <GuestLayout #default>
      <Banner>
         <h1 class="text-white fw-bold">Booking Lapangan Online Terbaik</h1>
      </Banner>

      <section id="venue" class="py-5 px-3">
         <div class="row">
            <div class="col-md-9 mx-auto">
               <div class="row">
                  <div class="col-6">
                     <p class="fs-6 fw-bold"><span class="fw-light">Menampilkan</span> 3 venue tersedia</p>
                  </div>
                  <div class="col-6 text-end">
                     <p class="fs-6">Urutkan Berdasarkan harga terendah</p>
                  </div>
               </div>

               <div class="row row-gap-4">
                  <VenueCard v-for="venue of venues" :key="venue.id" :venue-id="venue.id" :venue-name="venue.name" :venue-image="venue.image" :venue-price="venue.price" :venue-city="venue.city" :venue-rating="venue.rating" />
               </div>
            </div>
         </div>
      </section>
   </GuestLayout>
</template>

<script>
import GuestLayout from "../../layouts/GuestLayout.vue";
import Banner from "./components/Banner.vue";
import VenueCard from "./components/VenueCard.vue";
import Venues from "../../utils/data";
import { setTitle } from "../../utils";

export default {
   name: "Venue",
   components: { GuestLayout, Banner, VenueCard },
   data() {
      return {
         venues: null,
      };
   },
   created() {
      this.venues = Venues;
      setTitle("BVM - BOL Venue Management");
   },
};
</script>

<style></style>

<template>
   <GuestLayout #default>
      <Banner>
         <h1 class="text-white fw-bold">Booking Lapangan Online Terbaik</h1>
      </Banner>

      <section id="venue" class="py-5 px-3">
         <div class="row" v-if="loading">
            <div class="col-12">
               <Loading size="80px" color="border-navy" thick="8px" />
            </div>
         </div>

         <div class="row" v-else>
            <div class="col-md-9 mx-auto">
               <div class="row">
                  <div class="col-6">
                     <p class="fs-6 fw-bold"><span class="fw-light">Menampilkan</span> {{ venues.length }} venue tersedia</p>
                  </div>
                  <div class="col-6 text-end">
                     <p class="fs-6">Urutkan Berdasarkan harga terendah</p>
                  </div>
               </div>

               <div class="row row-gap-4">
                  <VenueCard v-for="venue of venues" :key="venue._id" :venue-id="venue._id" :venue-name="venue.name" :venue-image="venue.images[0]" :venue-price="venue.price" :venue-city="venue.city" :venue-rating="venue.rating" />
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
import Loading from "../../components/Loading.vue";

import { setTitle } from "../../utils";
import { apiUrl } from "../../config/const";
import axios from "axios";

export default {
   name: "Venue",
   components: { GuestLayout, Banner, VenueCard, Loading },
   data() {
      return {
         venues: [],
         loading: false,
      };
   },
   async created() {
      setTitle("BVM - BOL Venue Management");

      this.loading = !this.loading;
      try {
         const response = await axios.get(apiUrl("venue"));
         this.venues = response.data.payload;
         this.loading = !this.loading;
      } catch (err) {
         console.log("Error : " + err);
      }
   },
};
</script>

<style></style>

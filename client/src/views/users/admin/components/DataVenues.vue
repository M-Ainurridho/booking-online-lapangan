<template>
   <div class="text-end">
      <button class="border bg-navy text-white p-2 rounded-3 shadow mb-2" @click="store.setModal('tambah-venue-modal')">Tambah Venue</button>
   </div>
   <table class="table table-bordered text-center">
      <thead>
         <tr class="table-dark">
            <th scope="col">#</th>
            <th scope="col">Venue</th>
            <th scope="col">Action</th>
         </tr>
      </thead>
      <tbody>
         <tr v-for="(venue, i) in store.venues.data">
            <th scope="row">{{ i + 1 }}</th>
            <td>{{ venue.name }}</td>
            <td>
               <i class="bx bx-info-circle fs-5 text-white bg-info p-1 rounded-3 pointer mx-1" @click="venueInfo(venue._id)"></i>
               <i class="bx bx-trash fs-5 text-white bg-danger p-1 rounded-3 pointer mx-1" @click="deleteModal(venue._id)"></i>
            </td>
         </tr>
      </tbody>
   </table>
</template>

<script>
import axios from "axios";
import { store } from "../../../../utils/store";
import { apiUrl } from "../../../../config/const";

export default {
   name: "Data Venues",
   data() {
      return {
         store,
      };
   },
   async created() {
      try {
         const response = await axios.get(apiUrl("venue"));
         store.setVenues(response.data.payload);
      } catch (err) {
         console.error(err);
      }
   },
   methods: {
      venueFound(_id) {
         const venue = store.venues.data.find((v) => v._id === _id);
         store.setDetailVenue(venue);
      },
      venueInfo(_id) {
         this.venueFound(_id);
         store.setModal("detail-venue-modal");
      },

      deleteModal(_id) {
         this.venueFound(_id);
         store.setModal("delete-venue-modal");
      },
   },
};
</script>

<style></style>

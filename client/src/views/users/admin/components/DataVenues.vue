<template>
   <div class="text-end">
      <button class="border bg-navy text-white p-2 rounded-3 shadow mb-2">Tambah Venue</button>
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
         <!-- <tr v-if="store.booking.data.length < 1">
            <td colspan="3">Data Empty</td>
         </tr> -->
         <tr v-for="(venue, i) in venues">
            <th scope="row">{{ i + 1 }}</th>
            <td>{{ venue.name }}</td>
            <td>
               <i class="bx bx-info-circle fs-5 text-white bg-info p-1 rounded-3 pointer mx-1"></i>
               <i class="bx bx-trash fs-5 text-white bg-danger p-1 rounded-3 pointer mx-1"></i>
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
         venues: [],
         store,
      };
   },
   async created() {
      try {
         const response = await axios.get(apiUrl("venue"));
         this.venues = response.data.payload;
      } catch (err) {
         console.error(err);
      }
   },
};
</script>

<style></style>

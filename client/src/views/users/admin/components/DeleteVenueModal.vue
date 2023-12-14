<template>
   <div class="col-md-4 mx-auto my-auto rounded-3">
      <div class="row bg-white rounded-2 p-4">
         <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
               <h5 class="card-title fw-medium">Delete Venue</h5>
               <i class="bx bx-x close fw-bold fs-3 pointer" @click="closeModal"></i>
            </div>
         </div>

         <div class="col-12 p-2 rounded-3 mt-2">
            <div class="modal-body">
               <p>Yakin ingin menghapus venue {{ store.venues.detail.name }}?</p>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-secondary me-2" @click="closeModal">Close</button>
               <button type="button" class="btn bg-navy text-white" @click="deleteVenue">Delete</button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from "axios";
import { apiUrl } from "../../../../config/const";
import { store } from "../../../../utils/store";

export default {
   data() {
      return {
         store,
      };
   },
   methods: {
      async deleteVenue() {
         try {
            const response = await axios.delete(apiUrl(`venue/${store.venues.detail._id}`));

            store.setVenues(response.data.payload);
            store.setModal();
            store.setAlert(true, 200, "Berhasil Menghapus Venue");
         } catch (err) {
            console.error(err);
         }
      },
      closeModal() {
         store.setDetailVenue();
         store.setModal();
      },
   },
};
</script>

<style></style>

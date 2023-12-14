<template>
   <div class="col-md-4 mx-auto my-auto rounded-3">
      <div class="row bg-white rounded-2 p-4">
         <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
               <h5 class="card-title fw-medium">Venue Detail</h5>
               <i class="bx bx-x close fw-bold fs-3 pointer" @click="closeModal"></i>
            </div>
         </div>

         <div class="col-12 p-2 rounded-3 mt-4">
            <ul class="list-group list-group-flush">
               <li class="list-group-item"><strong>Venue :</strong> {{ store.venues.detail?.name }}</li>
               <li class="list-group-item text-truncate"><strong>Deskripsi :</strong> {{ store.venues.detail?.description }}</li>
               <li class="list-group-item d-flex">
                  <strong class="">Gambar :</strong>
                  <ul style="list-style-type: square">
                     <li v-for="img in store.venues.detail?.images">
                        <a :href="`/src/assets/images/venue/${img}`" target="_blank" class="text-decoration-none">{{ img }}</a>
                     </li>
                  </ul>
               </li>
               <li class="list-group-item"><strong>Min harga :</strong> {{ printPrice }}</li>
               <li class="list-group-item"><strong>Alamat :</strong> {{ store.venues.detail?.address }}, {{ store.venues.detail?.city }}</li>
               <li class="list-group-item"><strong>Buka :</strong> {{ store.venues.detail?.open }}</li>
               <li class="list-group-item"><strong>Rating :</strong> {{ store.venues.detail?.rating }}</li>
            </ul>
         </div>
      </div>
   </div>
</template>

<script>
import { toRupiah } from "../../../../utils";
import { store } from "../../../../utils/store";

export default {
   name: "Detail Venue Modal",
   data() {
      return {
         store,
      };
   },
   computed: {
      printPrice() {
         return toRupiah(store.venues.detail?.price);
      },
   },
   methods: {
      closeModal() {
         store.setDetailVenue();
         store.setModal();
      },
   },
};
</script>

<style></style>

<template>
   <table class="table table-bordered text-center">
      <thead>
         <tr class="table-dark">
            <th scope="col">#</th>
            <th scope="col">Order ID</th>
            <th scope="col">Detail</th>
         </tr>
      </thead>
      <tbody>
         <tr v-if="store.booking.data.length < 1">
            <td colspan="3">no data needs to be confirmed</td>
         </tr>
         <tr v-for="({ orderId, _id }, i) in store.booking.data">
            <th scope="row">{{ i + 1 }}</th>
            <td>{{ orderId }}</td>
            <td class="text-center">
               <i @click="bookingDetailModal(_id)" class="bx bx-info-circle fs-5 text-white bg-info p-1 rounded-3 pointer"></i>
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
   name: "Payment Confirmation",
   data() {
      return {
         store,
      };
   },
   async created() {
      try {
         const { data } = await axios.get(apiUrl("user/booking"));

         const filtered = data.payload.filter((booked) => booked.status == "Menunggu Konfirmasi");
         store.setBooking(filtered);
      } catch (err) {
         console.error(err);
      }
   },
   methods: {
      bookingDetailModal(_id) {
         const detail = store.booking.data.find((value) => value._id == _id);

         store.setDetailBooking(detail);
         store.setModal("booking-detail");
      },
   },
};
</script>

<style></style>

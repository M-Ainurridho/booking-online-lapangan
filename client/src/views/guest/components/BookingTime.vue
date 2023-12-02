<template>
   <button ref="buttonCard" class="card pointer" @click="newBooking">
      <div class="card-body mx-auto">
         <div ref="playTime" class="card-title m-0 fw-semibold">{{ startHour }} - {{ endHour }}</div>
         <div ref="isBooked" class="card-text text-opacity-50" style="font-size: 14px"></div>
      </div>
      <i v-if="addBooking" class="bx bxs-badge-check fs-4 text-navy" style="position: absolute; top: -9px; left: 0; right: 0"></i>
   </button>
</template>

<script>
import { apiUrl } from "../../../config/const";
import { toRupiah, timeString, dateString } from "../../../utils";
import { store } from "../../../utils/store";

import axios from "axios";

export default {
   props: ["field", "time", "venue", "booked"],
   data() {
      return {
         addBooking: false,
         store,
      };
   },
   async created() {
      const date = dateString(this.time.start);
      const cart = store.carts?.fields.find(({ name }) => name == this.field.name);

      if (cart) {
         for (let i = 0; i < cart.added.length; i++) {
            if (cart.added[i].start == this.time.start && cart.added[i].date == `${date[0]}, ${date[2]} ${date[1]} ${date[3]}`) {
               return (this.addBooking = true);
            }
         }
      }
   },
   mounted() {
      if (this.addBooking) {
         this.$refs.buttonCard.classList.add("activeCard", "bg-navy-10");
         this.$refs.playTime.classList.add("text-navy");
         this.$refs.isBooked.classList.add("text-navy");
      }

      if (this.booked.length < 1) return (this.$refs.isBooked.textContent = toRupiah(this.venue.price));

      for (let i = 0; i < this.booked.length; i++) {
         if (this.booked[i].playTime.start === this.start) {
            return (this.$refs.isBooked.textContent = "Booked"), this.$refs.buttonCard.classList.replace("pointer", "border-0"), this.$refs.buttonCard.setAttribute("disabled", "");
         } else {
            this.$refs.isBooked.textContent = toRupiah(this.venuePrice);
         }
      }
   },
   computed: {
      startHour() {
         return timeString(this.time.start);
      },

      endHour() {
         return timeString(this.time.end);
      },
   },
   methods: {
      async newBooking() {
         if (!store.auth) return store.setAlert(true, 402, "Kamu belum login!");

         const date = dateString(this.time.start);

         if (this.addBooking) return;

         this.$refs.buttonCard.classList.add("activeCard", "bg-navy-10");
         this.$refs.playTime.classList.add("text-navy");
         this.$refs.isBooked.classList.add("text-navy");
         this.addBooking = !this.addBooking;

         const data = {
            venue: this.venue.name,
            rating: this.venue.rating,
            address: this.venue.city,
            field: this.field.name,
            date: `${date[0]}, ${date[2]} ${date[1]} ${date[3]}`,
            start: this.time.start,
            end: this.time.end,
            price: this.venue.price,
         };

         try {
            const addCart = await axios.patch(apiUrl(`user/cart/${store.user._id}`), data);
            store.setCarts(addCart.data.payload);
         } catch (err) {
            console.log("error : " + err);
         }
      },
   },
};
</script>

<style scoped>
.activeCard {
   border: 1px solid #000080 !important;
}
</style>

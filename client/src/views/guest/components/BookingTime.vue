<template>
   <button ref="buttonCard" style="position: relative" class="card pointer" @click="newBooking">
      <div class="card-body mx-auto">
         <div ref="playTime" class="card-title m-0 fw-semibold">{{ startHour }} - {{ endHour }}</div>
         <div ref="isBooked" class="card-text text-opacity-50" style="font-size: 14px"></div>
      </div>
      <i v-if="addBooking" class="bx bxs-badge-check fs-4 text-navy" style="position: absolute; top: -9px; left: 0; right: 0"></i>
   </button>
</template>

<script>
import { toRupiah, timeString, dateString } from "../../../utils";
import { store } from "../../../utils/store";

export default {
   props: ["fieldName", "fieldId", "bookingId", "start", "end", "venuePrice", "venueName", "booked"],
   data() {
      return {
         addBooking: false,
         store,
      };
   },
   created() {
      for (let j = 0; j < store.cart.length; j++) {
         console.log(this.start, this.end);
         if (store.cart[j].fieldName == this.fieldName && store.cart[j].start == this.start) {
            return (this.addBooking = !this.addBooking);
         }
      }
   },
   watch: {
      addBooking(newVal) {
         if (newVal) {
            this.$refs.buttonCard.classList.add("activeCard", "bg-navy-10");
            this.$refs.playTime.classList.add("text-navy");
            this.$refs.isBooked.classList.add("text-navy");
         } else {
            this.$refs.buttonCard.classList.remove("activeCard", "bg-navy-10");
            this.$refs.playTime.classList.remove("text-navy");
            this.$refs.isBooked.classList.remove("text-navy");
         }
      },
   },
   mounted() {
      if (this.booked.length < 1) return (this.$refs.isBooked.textContent = toRupiah(this.venuePrice));

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
         return timeString(this.start);
      },

      endHour() {
         return timeString(this.end);
      },
   },
   methods: {
      async newBooking() {
         const date = dateString(this.start);
         if (this.addBooking) {
            store.deleteCart({
               fieldName: this.fieldName,
               date: `${date[0]}, ${date[2]} ${date[1]} ${date[3]}`,
               start: timeString(this.start),
            });
            this.addBooking = !this.addBooking;
         } else {
            store.addCart(this.venueName, {
               fieldName: this.fieldName,
               date: `${date[0]}, ${date[2]} ${date[1]} ${date[3]}`,
               start: timeString(this.start),
               end: timeString(this.end),
               price: toRupiah(this.venuePrice),
            });
            this.addBooking = !this.addBooking;
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

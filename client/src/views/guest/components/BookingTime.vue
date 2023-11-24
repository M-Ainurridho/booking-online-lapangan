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
      const date = dateString(this.start);
      for (let j = 0; j < store.cart.schedules.length; j++) {
         if (store.cart.schedules[j].fieldName == this.fieldName && store.cart.schedules[j].start == timeString(this.start) && store.cart.schedules[j].date == `${date[0]}, ${date[2]} ${date[1]} ${date[3]}`) {
            return (this.addBooking = !this.addBooking);
         }
      }
   },
   mounted() {
      if (this.addBooking) {
         this.$refs.buttonCard.classList.add("activeCard", "bg-navy-10");
         this.$refs.playTime.classList.add("text-navy");
         this.$refs.isBooked.classList.add("text-navy");
      }

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
            this.$refs.buttonCard.classList.remove("activeCard", "bg-navy-10");
            this.$refs.playTime.classList.remove("text-navy");
            this.$refs.isBooked.classList.remove("text-navy");
            store.deleteCart({
               fieldName: this.fieldName,
               date: `${date[0]}, ${date[2]} ${date[1]} ${date[3]}`,
               start: timeString(this.start),
            });
         } else {
            this.$refs.buttonCard.classList.add("activeCard", "bg-navy-10");
            this.$refs.playTime.classList.add("text-navy");
            this.$refs.isBooked.classList.add("text-navy");
            store.addCart(this.venueName, {
               fieldName: this.fieldName,
               date: `${date[0]}, ${date[2]} ${date[1]} ${date[3]}`,
               start: timeString(this.start),
               end: timeString(this.end),
               price: toRupiah(this.venuePrice),
            });
         }
         this.addBooking = !this.addBooking;
      },
   },
};
</script>

<style scoped>
.activeCard {
   border: 1px solid #000080 !important;
}
</style>

<template>
   <button ref="buttonCard" style="position: relative" class="card cursor-pointer" :class="{ activeCard: addBooking }" @click="newBooking">
      <div class="card-body mx-auto">
         <div class="card-title m-0 fw-semibold">{{ startHour }} - {{ endHour }}</div>
         <div ref="isBooked" class="card-text text-opacity-50" style="font-size: 14px"></div>
      </div>
      <i v-if="addBooking" class="bx bxs-badge-check fs-4 text-navy" style="position: absolute; top: -9px; left: 0; right: 0"></i>
   </button>
</template>

<script>
import { toRupiah } from "../../../utils";
import { store } from "../../../utils/store";

export default {
   props: ["fieldName", "fieldId", "bookingId", "start", "end", "venuePrice", "booked"],
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
   mounted() {
      if (this.booked.length < 1) return (this.$refs.isBooked.textContent = toRupiah(this.venuePrice));

      for (let i = 0; i < this.booked.length; i++) {
         if (this.booked[i].playTime.start === this.start) {
            return (this.$refs.isBooked.textContent = "Booked"), this.$refs.buttonCard.classList.replace("cursor-pointer", "border-0"), this.$refs.buttonCard.setAttribute("disabled", "");
         } else {
            this.$refs.isBooked.textContent = toRupiah(this.venuePrice);
         }
      }
   },
   computed: {
      startHour() {
         return `${new Date(this.start).getHours()}:${new Date(this.start).getMinutes().toString().length > 1 ? new Date(this.start).getMinutes() : "00"}`;
      },

      endHour() {
         return `${new Date(this.end).getHours()}:${new Date(this.end).getMinutes().toString().length > 1 ? new Date(this.end).getMinutes() : "00"}`;
      },
   },
   methods: {
      async newBooking() {
         if (this.addBooking) {
            store.deleteCart({ fieldName: this.fieldName, start: this.start });
            this.addBooking = !this.addBooking;
         } else {
            store.addCart({ fieldName: this.fieldName, start: this.start, end: this.end });
            this.addBooking = !this.addBooking;
         }
      },
   },
};
</script>

<style scoped>
.cursor-pointer {
   cursor: pointer;
}
.activeCard {
   border: 1px solid #000080 !important;
}
</style>

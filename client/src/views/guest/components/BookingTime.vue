<template>
   <div ref="card" class="card" @click="activeCard">
      <div class="card-body text-center">
         <div class="card-title m-0 fw-semibold">{{ startHour }} - {{ endHour }}</div>
         <div ref="isBooked" class="card-text text-opacity-50" style="font-size: 14px"></div>
      </div>
   </div>
</template>

<script>
import { toRupiah } from "../../../utils";

export default {
   props: ["start", "end", "venuePrice", "booked"],
   mounted() {
      if (this.booked.length < 1) return (this.$refs.isBooked.textContent = toRupiah(this.venuePrice));

      for (let i = 0; i < this.booked.length; i++) {
         if (parseInt(this.booked[i].playTime.start) == this.start) {
            return (this.$refs.isBooked.textContent = "Booked");
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
      activeCard() {
         this.$refs.card.classList.add("active");
      },
   },
};
</script>

<style scoped>
.card {
   cursor: pointer;
}
.active {
   border: 1px solid #000080 !important;
}
</style>

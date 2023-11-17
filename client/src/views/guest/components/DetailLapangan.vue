<template>
   <div class="col-12">
      <div class="row px-3 py-4 border-bottom detail-lapangan">
         <div class="col-4">
            <img src="../../../assets/images/venue/badminton.jpg" alt="gambar" class="w-100 object-fit-cover rounded-3" />
         </div>
         <div class="col-8 border-start">
            <h5>{{ fieldName }}</h5>
            <div class="spek-lapangan">
               <p class="m-0 fs-6"><i class="bx bx-basketball me-1"></i> Basketball</p>
               <p class="m-0 fs-6"><i class="bx bx-map-pin me-1"></i> Indoor</p>
               <p class="m-0 fs-6"><i class="bx bx-water me-1"></i> Lantai</p>
            </div>
            <button class="border bg-navy text-white fw-semibold px-3 py-2 mt-3 rounded-3 d-flex align-items-center column-gap-2" @click="dropdown = !dropdown">
               {{ bookingTime.length - booked.length }} Lapangan Tersedia <i class="bx fs-4" :class="dropdown ? 'bx-down-arrow-circle' : 'bx-up-arrow-circle'"></i>
            </button>
            <div v-if="dropdown" class="waktu-booking mt-4 pt-3 border-top">
               <BookingTime v-for="(time, i) in bookingTime" :key="i" :field-name="fieldName" :field-id="fieldId" :booking-id="i" :start="time.start" :end="time.end" :venue-price="venuePrice" :booked="booked" />
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import BookingTime from "./BookingTime.vue";

export default {
   components: { BookingTime },
   props: ["fieldId", "fieldName", "bookingTime", "bookedTime", "venuePrice", "closeDropdown"],
   data() {
      return {
         dropdown: false,
         booked: [],
      };
   },
   watch: {
      bookedTime(newVal) {
         this.dropdown = this.closeDropdown;
         if (newVal) {
            const filter = newVal.filter((val) => val.fieldName == this.fieldName);
            this.booked = filter;
         }
      },
   },
};
</script>

<style scoped>
.detail-lapangan img {
   height: 170px;
}

.spek-lapangan p {
   margin-bottom: -12px !important;
}

.spek-lapangan button {
   width: 30%;
}

.waktu-booking {
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   gap: 10px;
}
</style>

<template>
   <div class="col-12 col-md-6 col-lg-4">
      <div class="card rounded-4 overflow-hidden" @click="navigate">
         <img :src="reqImage(venueImage)" class="card-img venue-img" :alt="venueName" />
         <div class="card-body">
            <p class="card-subtitle fw-bold mb-1">Venue</p>
            <h5 class="venue-name">{{ venueName }}</h5>
            <p class="card-subtitle">{{ venueCity }} <i class="bx bxs-star text-warning"></i> {{ venueRating }}</p>
            <div class="venue-category mt-2 mb-3">
               <small><i class="bx bx-basketball fw-bolder"></i> Basketball</small>
            </div>
            <div class="venue-price">
               <small>Mulai dari</small>
               <p class="fw-bold">{{ printPrice }}<sub>/sesi</sub></p>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { toRupiah } from "../../../utils";
import { baseUrl } from "../../../config/const";

export default {
   props: ["venueId", "venueName", "venueImage", "venuePrice", "venueCity", "venueRating"],
   methods: {
      navigate() {
         this.$router.push({ name: "Detail Venue", params: { _id: this.venueId } });
      },
   },
   computed: {
      printPrice() {
         return toRupiah(this.venuePrice);
      },
      reqImage(img) {
         return baseUrl(`src/assets/images/venue/${img}`);
      },
   },
};
</script>

<style scoped>
.card:hover {
   box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
   cursor: pointer;
   transition: 0.5s;
}
.venue-img {
   height: 250px;
   object-fit: cover;
   border-radius: 0;
}

.card-subtitle {
   font-size: 15px;
}

.card-subtitle,
.venue-category,
sub {
   opacity: 0.5;
}

.venue-category small {
   margin-right: 5px;
}

sub {
   display: inline-block;
   transform: translateY(-4px);
   font-weight: normal;
}

.venue-price p {
   margin-top: -6px;
}
</style>

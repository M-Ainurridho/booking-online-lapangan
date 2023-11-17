<template>
   <GuestLayout #default>
      <BreadCrumbs :venue-name="this.venue.name">
         <RouterLink to="/" class="text-decoration-none text-white">Home > </RouterLink>
         <RouterLink to="/venues" class="text-decoration-none text-white">Sewa Lapangan > </RouterLink>
      </BreadCrumbs>

      <div v-if="notFound">
         <div class="row">
            <div class="col-2 mx-auto mt-5">
               <p class="bg-danger text-center text-white fw-semibold rounded-3 shadow">Detail Not Found</p>
            </div>
         </div>
      </div>

      <div v-else>
         <section id="venue-images" class="pt-5 pb-3">
            <div class="row">
               <div class="col-md-11 col-lg-9 mx-auto">
                  <div class="row image-wrapper overflow-hidden">
                     <div class="col-12 col-lg-8 h-100">
                        <img ref="images" :src="`/src/assets/images/venue/${venue.images && venue.images[0]}`" alt="" class="img-1 w-100 h-100 object-fit-cover" />
                     </div>
                     <div class="col-12 col-lg-4 h-100 d-flex flex-column row-gap-4">
                        <img src="../../assets/images/venue/sepak-bola.jpg" alt="" class="img-2 w-100 h-50 object-fit-cover rounded-top-end-3" />
                        <img src="../../assets/images/venue/badminton.jpg" alt="" class="img-3 w-100 h-50 object-fit-cover" />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section id="detail-venue" class="py-3">
            <div class="row">
               <div class="col-md-11 col-lg-9 mx-auto">
                  <div class="row">
                     <div class="col-12 col-lg-8">
                        <h2 class="venue-name fw-semibold">{{ venue.name }}</h2>
                        <p class="fs-6 fw-medium">{{ venue.rating }} <i class="bx bxs-star text-warning"></i> {{ venue.city }}</p>
                        <div class="venue-category mb-3 d-flex gap-2">
                           <small class="bg-secondary-subtle px-2 py-1 rounded-1 d-flex align-items-center fw-medium text-opacity-50"><i class="bx bx-basketball me-1"></i> Basketball</small>
                           <small class="bg-secondary-subtle px-2 py-1 rounded-1 d-flex align-items-center fw-medium text-opacity-50"><i class="bx bx-football me-1"></i> Mini Soccer</small>
                        </div>
                        <div class="venue-desc border-top border-bottom py-3">
                           <p class="lh-base text-opacity-75 fs-6 m-0">{{ venue.description }}</p>
                        </div>
                        <div class="venue-fasilitas mt-3">
                           <h5 class="mb-3">Fasilitas</h5>
                           <div class="row mb-2">
                              <div class="col-4"><i class="fa-solid fa-fw fa-car"></i> Parkir Mobil</div>
                              <div class="col-4"><i class="fa-solid fa-fw fa-motorcycle"></i> Parkir Motor</div>
                              <div class="col-4"><i class="fa-solid fa-fw fa-toilet"></i> Toilet</div>
                           </div>
                           <div class="row mb-2">
                              <div class="col-4"><i class="fa-solid fa-fw fa-bottle-water"></i> Jual Minuman</div>
                              <div class="col-4"><i class="fa-solid fa-fw fa-cookie-bite"></i> Jual Makanan Ringan</div>
                              <div class="col-4"><i class="fa-solid fa-fw fa-mosque"></i> Musholla</div>
                           </div>
                        </div>
                     </div>
                     <div class="col-12 col-lg-4">
                        <div class="row mb-4">
                           <div class="col-12 venue-price shadow p-3">
                              <h6 class="text-opacity-50 mb-0">Mulai dari</h6>
                              <p class="fw-bold fs-4">{{ printPrice }}<sub class="d-inline-block fw-medium ms-1 text-opacity-50">Per Sesi</sub></p>
                              <button class="w-100 bg-navy text-white p-2 rounded-3 border fw-medium">Cek Ketersediaan</button>
                           </div>
                        </div>
                        <div class="row mb-4">
                           <div class="col-12 booking-rules shadow">
                              <h5 class="fs-6 text-center mb-0 p-2">Rules Booking Lapangan</h5>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section id="pilih-lapangan" class="my-5">
            <div class="row">
               <div class="col-md-11 col-lg-9 mx-auto">
                  <h4>
                     <i class="bx bx-play text-navy bg-navy-50 rounded-circle"></i>
                     Pilih Lapangan
                  </h4>

                  <div class="row">
                     <div class="col-12 bg-white shadow rounded-4 p-3">
                        <div class="row">
                           <div class="col-7 d-flex justify-content-between">
                              <div ref="jadwal" v-for="(date, index) in jadwal" :key="index" class="booking-date p-2 pt-1 rounded-3" @click="currentlySchedule(index, date)">
                                 <h6 class="lead fs-xs text-center">{{ date[0] }}</h6>
                                 <span>{{ date[1] }} {{ date[2] }}</span>
                              </div>
                           </div>
                           <div class="col-5 d-flex align-items-center justify-content-between border-start">
                              <i class="bx bx-calendar fs-3"></i>

                              <p class="fs-6 border rounded-3 my-auto px-3 fw-medium d-flex align-items-center column-gap-1"><span>Filter Waktu</span> <i class="bx bx-slider"></i></p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div class="row">
                     <DetailLapangan v-for="{ _id, name } in venue.fields" :key="_id" :field-id="_id" :field-name="name" :bookingTime="bookingTime" :bookedTime="booked" :venue-price="venue.price" :closeDropdown="closeDropdown" />
                  </div>
               </div>
            </div>
         </section>
      </div>
   </GuestLayout>
</template>

<script>
import GuestLayout from "../../layouts/GuestLayout.vue";
import BreadCrumbs from "./components/BreadCrumbs.vue";
import DetailLapangan from "./components/DetailLapangan.vue";

import { RouterLink } from "vue-router";
import { dates, times } from "../../utils/date";
import { toRupiah } from "../../utils";
import axios from "axios";

export default {
   name: "Detail Venue",
   components: { GuestLayout, BreadCrumbs, RouterLink, DetailLapangan },
   data() {
      return {
         venue: {},
         jadwal: [],
         closeDropdown: false,
         bookingTime: [],
         booked: [],
         notFound: false,
         loading: false,
         lapangan: ["Lap 1", "Lap 2"],
      };
   },
   async created() {
      this.jadwal = dates();
      this.loading = !this.loading;

      try {
         const { _id } = this.$route.params;

         const venue = await axios.get(`http://localhost:3000/venue/${_id}`);
         this.venue = venue.data.payload;
      } catch (err) {
         this.notFound = !this.notFound;
      }

      try {
         const booking = await axios.get(`http://localhost:3000/user/booking/${this.jadwal[0][2]} ${this.jadwal[0][1]}, ${this.jadwal[0][3]}`);
         this.booked = booking.data.payload;
      } catch (err) {
         this.booked = err.response.data.errors;
      }

      const arrTime = this.venue.open.split(" - ");
      this.bookingTime = times(arrTime, this.jadwal[0]);
   },
   computed: {
      printPrice() {
         return toRupiah(this.venue.price);
      },
   },
   mounted() {
      this.$refs.jadwal[0].classList.add("bg-navy", "text-white");
   },
   methods: {
      async currentlySchedule(index, date) {
         const schedules = this.$refs.jadwal;
         for (let i = 0; i < schedules.length; i++) {
            schedules[i].classList.remove("bg-navy", "text-white");
         }
         this.$refs.jadwal[index].classList.add("bg-navy", "text-white");

         const arrTime = this.venue.open.split(" - ");
         this.bookingTime = times(arrTime, [null, date[1], date[2], date[3]]);

         try {
            const day = `${date[2]} ${date[1]}, ${date[3]}`;
            const booking = await axios.get(`http://localhost:3000/user/booking/${day}`);
            this.booked = booking.data.payload;
         } catch (err) {
            this.booked = err.response.data.errors;
         }
      },
   },
};
</script>

<style scoped>
.image-wrapper {
   height: 520px !important;
}

.img-1 {
   border-top-left-radius: 10px;
   border-bottom-left-radius: 10px;
}

.img-2 {
   border-top-right-radius: 10px;
}

.img-3 {
   border-bottom-right-radius: 10px;
}

sub {
   transform: translateY(-4px);
}

.booking-date {
   cursor: pointer;
}

.booking-date h6 {
   transform: translateY(8px);
}

@media screen and (max-width: 992px) {
   .image-wrapper {
      height: 300px !important;
   }

   .img-1 {
      border-radius: 10px !important;
   }
}
</style>

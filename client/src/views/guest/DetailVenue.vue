<template>
   <GuestLayout #default>
      <BreadCrumbs>
         <RouterLink to="/" class="text-decoration-none text-white">Home > </RouterLink>
         <RouterLink to="/venues" class="text-decoration-none text-white">Sewa Lapangan > </RouterLink>
      </BreadCrumbs>

      <section id="venue-images" class="pt-5 pb-3">
         <div class="row">
            <div class="col-md-11 col-lg-9 mx-auto">
               <div class="row image-wrapper overflow-hidden">
                  <div class="col-12 col-lg-8 h-100">
                     <img :src="`/src/assets/images/venue/${venue.image}`" alt="" class="img-1 w-100 h-100 object-fit-cover" />
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
                        <p class="lh-base text-opacity-75 fs-6 m-0">{{ venue.desc }}</p>
                     </div>
                     <div class="venue-fasilitas mt-3">
                        <h4 class="mb-3">Fasilitas</h4>
                        <div class="row mb-2">
                           <div class="col-4"><i class="fa-solid fa-fw fa-car"></i> Parkir Mobil</div>
                           <div class="col-4"><i class="fa-solid fa-fw fa-motorcycle"></i> Mini Motor</div>
                           <div class="col-4"><i class="fa-solid fa-fw fa-toilet"></i> Toilet</div>
                        </div>
                        <div class="row mb-2">
                           <div class="col-4"><i class="fa-solid fa-fw fa-bottle-water"></i> Jual Minuman</div>
                           <div class="col-4"><i class="fa-solid fa-fw fa-cookie-bite"></i> Jual Makanan Ringan</div>
                           <div class="col-4"><i class="fa-solid fa-fw fa-mosque"></i> Musholla</div>
                        </div>
                        <!-- <i class="bx bx-football me-1"></i> Mini Soccer -->
                     </div>
                  </div>
                  <div class="col-12 col-lg-4">
                     <div class="row mb-4">
                        <div class="col-12 venue-price shadow p-3">
                           <h6 class="text-opacity-50 mb-0">Mulai dari</h6>
                           <p class="fw-bold fs-4">Rp. {{ venue.price }}<sub class="d-inline-block fw-medium ms-1 text-opacity-50">Per Sesi</sub></p>
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
   </GuestLayout>
</template>

<script>
import GuestLayout from "../../layouts/GuestLayout.vue";
import BreadCrumbs from "./components/BreadCrumbs.vue";
import { RouterLink } from "vue-router";
import venues from "../../utils/data";

export default {
   name: "Detail Venue",
   components: { GuestLayout, BreadCrumbs, RouterLink },
   data() {
      return {
         venue: null,
      };
   },
   created() {
      const { id } = this.$route.params;
      this.venue = venues.find((v) => v.id == id);
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

@media screen and (max-width: 992px) {
   .image-wrapper {
      height: 300px !important;
   }

   .img-1 {
      border-radius: 10px !important;
   }
}
</style>

<template>
   <nav class="navbar fixed-top navbar-expand-lg bg-white border-bottom px-2">
      <div class="col-lg-9 col-12 mx-auto d-flex align-items-center justify-content-between">
         <RouterLink to="/" class="navbar-brand">
            <h2 class="my-auto">BOL</h2>
            <!-- <img src="../../../assets/images/icons/logotype.png" alt="brand" class="" /> -->
         </RouterLink>
         <div class="d-flex align-items-center cart-mobile">
            <i class="fa-solid fa-cart-shopping me-3"></i>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
            </button>
         </div>
         <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav-wrapper d-flex flex-column flex-lg-row justify-content-md-between">
               <div class="navbar-nav">
                  <RouterLink to="/venues" class="nav-link mx-2">Sewa lapangan</RouterLink>
                  <a class="nav-link mx-2" href="/blog">Blog</a>
               </div>
               <div class="ms-0 navbar-left d-flex align-items-center">
                  <i class="fa-solid fa-cart-shopping cart-desktop"></i>
                  <button class="border-0 bg-transparent btn-block mx-3 d-block d-md-inline-block" @click="store.setModal('login')">Masuk</button>
                  <button class="btn bg-navy btn-block text-white d-block d-md-inline-block" @click="store.setModal('register')">Daftar</button>
               </div>
            </div>
         </div>
      </div>
   </nav>
</template>

<script>
import { RouterLink } from "vue-router";
import { store } from "../../../utils/store";

export default {
   data() {
      return {
         currentPage: "",
         store,
      };
   },
   methods: {
      goToDashboard() {
         this.$router.push("/dashboard");
      },
   },
   created() {
      this.currentPage = this.$route.name;
   },
};
</script>

<style scoped>
.navbar {
   z-index: 999;
}
.navbar-collapse > div {
   width: 100%;
}

.cart-mobile {
   display: none !important;
}

.cart-desktop {
   display: inline-block !important;
}

.btn-block {
   width: auto;
}

@media screen and (max-width: 576px) {
   .cart-desktop {
      display: none !important;
   }

   .cart-mobile {
      display: flex !important;
      margin-right: 5px;
   }

   .btn-block {
      width: 100%;
      margin: 0 !important;
      margin-top: 5px !important;
   }
}
</style>

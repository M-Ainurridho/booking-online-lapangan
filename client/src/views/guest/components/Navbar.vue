<template>
   <nav class="navbar fixed-top navbar-expand-lg bg-white border-bottom">
      <div class="col-lg-9 col-11 mx-auto d-flex align-items-center justify-content-between">
         <RouterLink to="/" class="navbar-brand">
            <h2 class="my-auto">BOL</h2>
            <!-- <img src="../../../assets/images/icons/logotype.png" alt="brand" class="" /> -->
         </RouterLink>
         <div class="d-flex align-items-center">
            <i class="bx bx-cart fs-4 me-3 cart-mobile" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
               <span class="cart-count bg-navy text-center text-white fw-bold rounded-circle">{{ store.cart.length }}</span>
            </i>
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
                  <i class="bx bx-cart fs-4 cart-desktop pointer" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                     <span class="cart-count bg-navy text-center text-white fw-bold rounded-circle">{{ store.cart.length }}</span>
                  </i>
                  <button class="border-0 bg-transparent btn-block mx-3 d-block d-md-inline-block" @click="store.setModal('login')">Masuk</button>
                  <button class="btn bg-navy btn-block text-white d-block d-md-inline-block" @click="store.setModal('register')">Daftar</button>
               </div>
            </div>
         </div>
      </div>
   </nav>

   <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
         <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Jadwal Booking</h5>
         <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
         <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
               <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
               <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
               <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Dropdown </a>
               <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li>
                     <hr class="dropdown-divider" />
                  </li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
               </ul>
            </li>
         </ul>
         <form class="d-flex mt-3" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit">Search</button>
         </form>
      </div>
   </div>
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

.cart-mobile,
.cart-desktop {
   position: relative;
}

.cart-mobile {
   display: none !important;
}

.cart-desktop {
   display: inline-block !important;
}

.cart-count {
   position: absolute;
   top: -2px;
   right: -4px;

   width: 15px;
   height: 15px;

   font-size: 13px !important;
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

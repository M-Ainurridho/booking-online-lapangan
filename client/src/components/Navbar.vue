<template>
   <nav class="navbar fixed-top navbar-expand-lg bg-white border-bottom">
      <div class="col-lg-9 col-11 mx-auto d-flex align-items-center justify-content-between">
         <RouterLink to="/" class="navbar-brand">
            <h2 class="my-auto">BOL</h2>
            <!-- <img src="../../../assets/images/icons/logotype.png" alt="brand" class="" /> -->
         </RouterLink>
         <div class="d-flex align-items-center">
            <i class="bx bx-cart fs-4 me-3 cart-mobile" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
               <span class="cart-count bg-navy text-center text-white fw-bold rounded-circle">{{ cartCount }}</span>
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
                  <i class="bx bx-cart fs-4 cart-desktop pointer pe-3 border-end" @click="offcanvas = !offcanvas">
                     <span class="cart-count bg-navy text-center text-white fw-bold rounded-circle">{{ cartCount }}</span>
                  </i>
                  <div v-if="store.auth" @click="dropdown = !dropdown" class="px-3 d-flex align-items-center pointer" style="position: relative">
                     <i class="bx bx-user-circle fs-3"></i>

                     <div v-show="dropdown" class="profile-dropdown border bg-white p-2 rounded-3">
                        <RouterLink to="/user/profile" class="d-block text-decoration-none border-bottom py-2 text-dark"><i class="bx bx-fw bxs-edit"></i> Profil</RouterLink>
                        <span @click="goToDashboard" class="d-block text-decoration-none border-bottom py-2 text-dark"><i class="bx bx-fw bx-detail"></i> Dasbor</span>
                        <RouterLink to="#" @click="logout" class="d-block text-decoration-none py-2 text-dark">Keluar</RouterLink>
                     </div>
                  </div>
                  <div v-else>
                     <button class="border-0 bg-transparent btn-block px-4 d-block d-md-inline-block" @click="store.setModal('login')">Masuk</button>
                     <button class="btn bg-navy btn-block text-white d-block d-md-inline-block" @click="store.setModal('register')">Daftar</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </nav>

   <Cart :is-show="offcanvas" @close-cart="closeCart" />
</template>

<script>
import { RouterLink } from "vue-router";
import { store } from "../utils/store";
import Cart from "./Cart.vue";

export default {
   components: { Cart },
   data() {
      return {
         currentPage: "",
         dropdown: false,
         offcanvas: false,
         store,
      };
   },
   methods: {
      closeCart() {
         this.offcanvas = !this.offcanvas;
      },
      logout() {
         store.setAuth(false);
         store.setUser();
         store.setCarts();
         store.setAlert(true, 200, "Logged out");
         this.$router.push("/");
      },
   },
   created() {
      this.currentPage = this.$route.name;
   },
   computed: {
      cartCount() {
         if (store.carts?.fields) {
            const count = store.carts?.fields.reduce((total, value) => value.added.length + total, 0);
            return count;
         } else {
            return 0;
         }
      },
      goToDashboard() {
         if (store.user.role == "admin") {
            this.$router.push("/admin");
         } else {
            this.$router.push("/dashboard");
         }
      },
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

.cart-desktop .cart-count {
   position: absolute;
   top: -2px;
   right: 12px;

   width: 15px;
   height: 15px;

   font-size: 13px !important;
}

.btn-block {
   width: auto;
}

.profile-dropdown {
   position: absolute;
   top: 35px;
   right: 0;

   width: 200px;
}

.profile-dropdown a:hover,
.profile-dropdown span:hover {
   background-color: rgba(0, 0, 128, 0.05);
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

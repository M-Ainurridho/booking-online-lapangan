<template>
   <div class="col-md-3 mx-auto my-auto">
      <div class="row">
         <div class="col-12 bg-white rounded-2 py-3">
            <div class="d-flex justify-content-between align-items-center">
               <h4 class="card-title fw-medium">Masuk</h4>
               <i class="bx bx-x close fw-bold fs-3 pointer" @click="store.setModal()"></i>
            </div>
            <p class="fw-light fs-6">
               Belum Punya Akun BOL?
               <RouterLink to="#" class="text-navy" @click="store.setModal('register')">Daftar</RouterLink>
            </p>
            <form @submit.prevent="onSubmit">
               <div class="mb-3">
                  <input type="email" v-model="inputEmail" class="form-control" placeholder="Alamat Email" />
                  <div v-if="errors.status" class="w-100 mx-auto text-start">
                     <small v-for="err in errors.data" class="text-danger fs-italic">
                        {{ err.path == "email" ? err.msg + " - " : "" }}
                     </small>
                  </div>
               </div>
               <div class="mb-3">
                  <input type="password" v-model="inputPassword" class="form-control" placeholder="Kata Sandi" />
                  <div v-if="errors.status" class="w-100 mx-auto text-start">
                     <small v-for="err in errors.data" class="text-danger fs-italic">
                        {{ err.path == "password" ? err.msg + " - " : "" }}
                     </small>
                  </div>
               </div>
               <div class="mb-3">
                  <loading-button btn-text="Selanjutnya" :loading="loading" />
               </div>
            </form>
         </div>
      </div>
   </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { store } from "../../utils/store";
import { exchangeToken } from "../../utils";

import axios from "axios";
import LoadingButton from "../../components/buttons/LoadingButton.vue";

export default {
   components: { "loading-button": LoadingButton },
   data() {
      return {
         inputEmail: "",
         inputPassword: "",
         errors: {
            status: false,
            data: [],
         },
         loading: false,
         store,
      };
   },
   methods: {
      async onSubmit() {
         this.loading = !this.loading;

         try {
            const response = await axios.post("http://localhost:3000/auth/login", { email: this.inputEmail, password: this.inputPassword });

            localStorage.setItem("martoken", response.data.payload.token);
            
            await exchangeToken();

            this.loading = !this.loading;
         } catch (err) {
            this.errors.status = true;
            this.errors.data = err.response.data.errors;
            this.loading = !this.loading;
         }
      },
   },
};
</script>

<style></style>

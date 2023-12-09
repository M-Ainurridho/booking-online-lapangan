<template>
   <div class="col-md-3 mx-auto my-auto">
      <div class="row">
         <div class="col-12 bg-white rounded-2 py-3">
            <div class="d-flex justify-content-between align-items-center">
               <h4 class="card-title fw-medium">Daftar</h4>
               <i class="bx bx-x close fw-bold fs-3 pointer" @click="store.setModal()"></i>
            </div>
            <p class="fw-light fs-6">
               Sudah Punya Akun BOL?
               <RouterLink to="#" class="text-navy" @click="store.setModal('login')">Masuk</RouterLink>
            </p>
            <form @submit.prevent="onSubmit">
               <div class="mb-3">
                  <input type="text" v-model="inputEmail" class="form-control" placeholder="Alamat Email" autofocus />
                  <div v-if="errors.status">
                     <small v-for="err in errors.data" class="text-danger fs-italic">
                        {{ err.msg }}
                     </small>
                  </div>
               </div>
               <div class="mb-3">
                  <button type="submit" v-if="loading" class="border w-100 bg-body-secondary py-2 rounded-2 text-white" disabled>
                     <Loading size="20px" color="border-secondary" thick="3px" />
                  </button>
                  <button type="submit" v-else class="border-0 w-100 bg-navy py-2 rounded-2 text-white">Selanjutnya</button>
               </div>
            </form>
         </div>
      </div>
   </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { store } from "../../utils/store";
import {apiUrl} from "../../config/const"
import axios from "axios";

import Loading from "../../components/Loading.vue";

export default {
   components: {Loading},
   data() {
      return {
         inputEmail: "",
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
         this.loading = true;

         try {
            const response = await axios.post(apiUrl(`auth/register`), {email: this.inputEmail});
            store.setUser(response.data.payload);

            this.$router.push("/auth/otp/email");
         } catch (err) {
            this.errors.status = true;
            this.errors.data = err.response.data.errors;
         } finally {
            this.loading = false;
         }
      },
   },
};
</script>

<style></style>

<template>
   <div class="row">
      <div class="col-11 bg-white rounded-2 py-3">
         <h4 class="card-title fw-medium">Masuk</h4>
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
               <button type="submit" v-if="loading" class="border w-100 bg-body-secondary py-2 rounded-2 text-white" disabled>
                  <Loading size="20px" color="border-secondary" thick="3px" />
               </button>
               <button type="submit" v-else class="border-0 w-100 bg-navy py-2 rounded-2 text-white">Selanjutnya</button>
            </div>
         </form>
      </div>
      <div class="col-md-1"><i class="bx bx-x close text-white fw-bold fs-3 pointer" @click="store.setModal()"></i></div>
   </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { store } from "../../utils/store";
import axios from "axios";

import Loading from "../../components/Loading.vue";

export default {
   components: { Loading },
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
            store.setUser(response.data.payload);

            if (response.data.payload.carts.fields.length > 0) {
               store.setCarts(response.data.payload.carts);
            }

            store.setAuth(true);
            store.setModal();
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

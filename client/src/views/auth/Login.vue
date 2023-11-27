<template>
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
         <button type="submit" class="border-0 w-100 py-2 rounded-2 text-white" :class="loading ? 'bg-secondary' : 'bg-navy'" :disabled="loading && 'disabled'">{{ loading ? "Loading..." : "Selanjutnya" }}</button>
      </div>
   </form>
</template>

<script>
import { RouterLink } from "vue-router";
import { store } from "../../utils/store";
import axios from "axios";

export default {
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
         this.loading = true;

         try {
            const response = await axios.post("http://localhost:3000/auth/login", { email: this.inputEmail, password: this.inputPassword });

            store.setUser(response.data.payload);
            store.setAuth(true);
            store.setModal();
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

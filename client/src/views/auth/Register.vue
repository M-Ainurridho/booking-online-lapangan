<template>
   <div class="col-md-4 mx-auto my-auto">
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
                  <input type="text" v-model="inputEmail" class="form-control" placeholder="Alamat Email" />
                  <div v-if="errors.status">
                     <small v-for="err in errors.data" class="text-danger fs-italic">
                        {{ err.msg }}
                     </small>
                  </div>
               </div>
               <div class="mb-3">
                  <button type="submit" class="border-0 w-100 py-2 rounded-2 text-white" :class="loading ? 'bg-secondary' : 'bg-navy'" :disabled="loading && 'disabled'">{{ loading ? "Loading..." : "Selanjutnya" }}</button>
               </div>
            </form>
         </div>
      </div>
   </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { store } from "../../utils/store";
import axios from "axios";

export default {
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
            const response = await axios.post("http://localhost:3000/auth/register", { email: this.inputEmail });
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

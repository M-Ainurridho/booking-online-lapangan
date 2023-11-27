<template>
   <form @submit.prevent="changePassword">
      <div class="mb-3">
         <div class="relative">
            <input type="password" v-model="oldPassword" class="show-pwd form-control py-2 pe-5" placeholder="Masukkan Kata Sandi Lama" />
            <i class="bx bxs-hide absolute right-0 top-0 bottom-0 fs-5 d-flex align-items-center pe-3" @click="showPassword($event, 0)"></i>
         </div>
         <div v-if="errors.status" class="w-100 mx-auto text-start">
            <small v-for="err in errors.data" class="text-danger fs-italic">
               {{ err.path == "oldPassword" ? err.msg + " - " : "" }}
            </small>
         </div>
      </div>
      <div class="mb-3">
         <div class="relative">
            <input type="password" v-model="newPassword" class="show-pwd form-control py-2 pe-5" placeholder="Kata Sandi Baru" />
            <i class="bx bxs-hide absolute right-0 top-0 bottom-0 fs-5 d-flex align-items-center pe-3" @click="showPassword($event, 1)"></i>
         </div>
         <div v-if="errors.status" class="w-100 mx-auto text-start">
            <small v-for="err in errors.data" class="text-danger fs-italic">
               {{ err.path == "newPassword" ? err.msg + " - " : "" }}
            </small>
         </div>
      </div>
      <div class="mb-3">
         <div class="relative">
            <input type="password" v-model="confirmPassword" class="show-pwd form-control py-2 pe-5" placeholder="Ketik Ulang Kata Sandi Baru" />
            <i class="bx bxs-hide absolute right-0 top-0 bottom-0 fs-5 d-flex align-items-center pe-3" @click="showPassword($event, 2)"></i>
         </div>
         <div v-if="errors.status" class="w-100 mx-auto text-start">
            <small v-for="err in errors.data" class="text-danger fs-italic">
               {{ err.path == "confirmPassword" ? err.msg + " - " : "" }}
            </small>
         </div>
      </div>
      <div class="mb-3 text-end">
         <button
            type="submit"
            ref="btn-submit"
            class="border bg-body-secondary text-secondary rounded-3 py-2 px-3"
            :disabled="!activeBtn && 'disabled'"
            :class="!activeBtn || loading ? 'bg-body-secondary text-secondary' : 'bg-navy text-white'"
         >
            {{ loading ? "Loading..." : "Simpan Perubahan" }}
         </button>
      </div>
   </form>
</template>

<script>
import { apiUrl } from "../../../config/const";
import { store } from "../../../utils/store";

import axios from "axios";

export default {
   data() {
      return {
         oldPassword: "",
         newPassword: "",
         confirmPassword: "",
         activeBtn: false,
         errors: {
            status: false,
            data: [],
         },
         loading: false,
         store,
      };
   },
   watch: {
      oldPassword(newVal) {
         newVal.length > 0 && (this.activeBtn = true);
      },
   },
   methods: {
      showPassword(e, index) {
         const password = Array.from(document.querySelectorAll(".show-pwd"));

         if (e.target.className.includes("bxs-hide")) {
            e.target.classList.replace("bxs-hide", "bxs-show");
            password[index].setAttribute("type", "text");
         } else {
            e.target.classList.replace("bxs-show", "bxs-hide");
            password[index].setAttribute("type", "password");
         }
      },
      async changePassword() {
         this.loading = !this.loading;

         try {
            const response = await axios.patch(apiUrl(`user/changepassword/${store.user._id}`), {
               oldPassword: this.oldPassword,
               newPassword: this.newPassword,
               confirmPassword: this.confirmPassword,
            });
            store.setAlert(response.data.status, response.status, response.data.message);
         } catch (err) {
            this.errors.status = true;
            this.errors.data = err.response.data.errors;
         } finally {
            this.loading = !this.loading;
            this.oldPassword = "";
            this.newPassword = "";
            this.confirmPassword = "";
         }
      },
   },
};
</script>

<style></style>

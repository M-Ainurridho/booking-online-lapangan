<template>
   <form @submit.prevent="updateData">
      <div class="mb-3">
         <input type="text" v-model="inputFullname" class="form-control py-2" placeholder="Nama Lengkap*" />
         <div v-if="errors.status" class="w-100 mx-auto text-start">
            <small v-for="err in errors.data" class="text-danger fs-italic">
               {{ err.path == "fullname" ? err.msg + " - " : "" }}
            </small>
         </div>
      </div>
      <div class="mb-3">
         <input type="text" v-model="inputUsername" class="form-control py-2" placeholder="Username*" />
         <div v-if="errors.status" class="w-100 mx-auto text-start">
            <small v-for="err in errors.data" class="text-danger fs-italic">
               {{ err.path == "username" ? err.msg + " - " : "" }}
            </small>
         </div>
      </div>
      <div class="mb-3">
         <input type="text" v-model="inputNoHp" class="form-control py-2" placeholder="Nomor Ponsel" />
      </div>
      <div class="mb-3">
         <input type="email" v-model="inputEmail" class="form-control py-2" placeholder="Email*" />
         <div v-if="errors.status" class="w-100 mx-auto text-start">
            <small v-for="err in errors.data" class="text-danger fs-italic">
               {{ err.path == "email" ? err.msg + " - " : "" }}
            </small>
         </div>
      </div>
      <div class="mb-3 text-end">
         <button type="submit" class="border rounded-3 py-2 w-50" :class="loading ? 'bg-body-secondary text-secondary' : 'bg-navy text-white'">{{ loading ? "Loading..." : "Simpan Perubahan" }}</button>
      </div>
   </form>
</template>

<script>
import axios from "axios";
import { store } from "../../../utils/store";
import { apiUrl } from "../../../config/const";

export default {
   data() {
      return {
         inputFullname: "",
         inputUsername: "",
         inputNoHp: "",
         inputEmail: "",
         errors: {
            status: false,
            data: [],
         },
         loading: false,
         store,
      };
   },
   async created() {
      try {
         const { data } = await axios.get(apiUrl(`user/${store.user._id}`));
         this.inputFullname = data.payload?.fullname;
         this.inputUsername = data.payload?.username;
         this.inputNoHp = data.payload?.noHp;
         this.inputEmail = data.payload?.email;
      } catch (err) {
         console.log("error : " + err);
      }
   },
   methods: {
      async updateData() {
         this.loading = !this.loading;

         try {
            console.log(store.user._id);
            const response = await axios.patch(apiUrl(`user/${store.user._id}`), {
               fullname: this.inputFullname,
               username: this.inputUsername,
               noHp: this.inputNoHp,
               email: this.inputEmail,
            });
         } catch (err) {
            this.errors.status = true;
            this.errors.data = err.response.data.errors;
         } finally {
            this.loading = !this.loading;
         }
      },
   },
};
</script>

<style></style>

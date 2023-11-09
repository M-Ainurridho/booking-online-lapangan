<template>
   <AuthLayout>
      <section id="basic-profile" class="d-flex flex-column justify-content-center">
         <div class="row">
            <div class="col-md-4 mx-auto">
               <div class="row">
                  <div class="col-12 text-center">
                     <h4 class="mb-4">Masukan Data Diri</h4>
                  </div>

                  <div class="col-12 text-center">
                     <form @submit.prevent="onSubmit">
                        <div class="mb-3">
                           <input type="text" class="w-75 p-2 rounded-3" v-model="inputName" placeholder="Nama Lengkap" />
                           <div v-if="errors.status" class="w-75 mx-auto text-start">
                              <small v-for="err in errors.data" class="text-danger fs-italic">
                                 {{ err.path == "fullname" ? err.msg : "" }}
                              </small>
                           </div>
                        </div>
                        <div class="mb-3">
                           <input type="text" class="w-75 p-2 rounded-3" v-model="inputUsername" placeholder="Username" />
                           <div v-if="errors.status" class="w-75 mx-auto text-start">
                              <small v-for="err in errors.data" class="text-danger fs-italic">
                                 {{ err.path == "username" ? err.msg : "" }}
                              </small>
                           </div>
                        </div>
                        <div class="mb-3">
                           <input type="password" class="w-75 p-2 rounded-3" v-model="inputPassword" placeholder="Password" />
                           <div v-if="errors.status" class="w-75 mx-auto text-start">
                              <small v-for="err in errors.data" class="text-danger">
                                 {{ err.path == "password" ? err.msg + " - " : "" }}
                              </small>
                           </div>
                        </div>
                        <div class="mb-3">
                           <button type="submit" class="border-0 w-75 py-2 rounded-2 text-white" :class="loading ? 'bg-secondary' : 'bg-navy'" :disabled="loading && 'disabled'">{{ loading ? "Loading..." : "Selesai" }}</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </section>
   </AuthLayout>
</template>

<script>
import axios from "axios";
import AuthLayout from "../../layouts/AuthLayout.vue";
import { store } from "../../utils/store";

export default {
   name: "Update Basic Profile",
   components: { AuthLayout },
   data() {
      return {
         inputName: "",
         inputUsername: "",
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
            const { data } = await axios.patch("http://localhost:3000/auth/basic-profile", {
               fullname: this.inputName,
               username: this.inputUsername,
               email: store.user.email,
               password: this.inputPassword,
            });

            const user = await axios.get(`http://localhost:3000/user/${data.payload._id}`);
            if (user.status === 200) {
               store.setAuth();
               store.setUser(user.data.payload);
               this.$router.push("/dashboard");
            }
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

<style>
#basic-profile {
   height: 85vh;
}

input {
   border: 1px solid #aaa;
}

input:active {
   border: 1px solid #000080 !important;
}
</style>

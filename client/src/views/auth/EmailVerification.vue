<template>
   <AuthLayout>
      <section id="otp-code" class="d-flex flex-column justify-content-center">
         <div class="row">
            <div class="col-md-4 mx-auto">
               <div class="row">
                  <div class="col-12 text-center">
                     <div class="bg-image bg-navy rounded-circle mx-auto overflow-hidden">
                        <img src="../../assets/images/icons/otp-email.png" alt="" class="otp-icon" />
                     </div>
                  </div>
               </div>

               <div class="row mt-5 mb-4">
                  <div class="col-12 text-center">
                     <h5>
                        <strong>Masukkan Kode Verifikasi</strong>
                     </h5>
                     <p class="fs-6 lh-sm">
                        Kami telah mengirimkan kode verifikasi ke <strong>{{ store.user.email }}.</strong> Silahkan masukkan 6 digit angka yang tertera pada Email.
                     </p>
                  </div>
               </div>

               <div class="row">
                  <div class="col-12 text-center">
                     <input type="number" class="w-75 p-2 rounded-3" v-model="otpCode" />
                     <div v-if="error.status" class="w-75 mx-auto text-start">
                        <small class="text-danger">
                           {{ error.msg }}
                        </small>
                     </div>
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
   name: "Email Verification",
   components: { AuthLayout },
   data() {
      return {
         otpCode: "",
         error: {
            status: false,
            msg: null,
         },
         store,
      };
   },
   watch: {
      async otpCode(newVal, oldVal) {
         try {
            if (newVal.toString().length === 6) {
               const response = await axios.post("http://localhost:3000/auth/email-verification", { otp: newVal.toString(), email: store.user.email });

               response.status === 200 && this.$router.push("/update-basic-profile");
            }
         } catch (err) {
            this.error.status = true;
            this.error.msg = err.response.data.message;
         }
      },
   },
};
</script>

<style scoped>
#otp-code {
   height: 85vh;
}
.bg-image {
   width: 100px;
   height: 100px;
}

.otp-icon {
   width: 80px;
   height: 80px;
   margin-top: 30px;
}

input[type="number"] {
   border: 1px solid #aaa;
}
</style>

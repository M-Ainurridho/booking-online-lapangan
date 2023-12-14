<template>
   <div class="col-md-6 mx-auto my-2 overflow-y-auto overflow-hidden rounded-3">
      <div class="row bg-white rounded-2 p-4">
         <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
               <h5 class="card-title fw-medium">Tambah Data Venue</h5>
               <i class="bx bx-x close fw-bold fs-3 pointer" @click="closeModal"></i>
            </div>
         </div>

         <div class="col-12 p-2 rounded-3 mt-2">
            <form @submit.prevent="onSubmit">
               <div class="mb-3">
                  <input type="text" v-model="name" name="name" class="form-control" placeholder="Nama venue..." />
                  <div v-if="errors.status" class="w-100 mx-auto text-start mb-0">
                     <small v-for="err in errors.data" class="text-danger fs-italic m-0">
                        {{ err.path == "name" ? err.msg + " - " : "" }}
                     </small>
                  </div>
               </div>
               <div class="mb-3">
                  <textarea class="form-control" v-model="description" rows="3" placeholder="Masukan Deskripsi..."></textarea>
                  <small v-for="err in errors.data" class="text-danger fs-italic m-0">
                     {{ err.path == "description" ? err.msg + " - " : "" }}
                  </small>
               </div>
               <div class="mb-3">
                  <input type="number" v-model="price" class="form-control" placeholder="Min harga 'cth:(30000 = 30.000)'" />
                  <small v-for="err in errors.data" class="text-danger fs-italic m-0">
                     {{ err.path == "price" ? err.msg + " - " : "" }}
                  </small>
               </div>
               <div class="mb-3">
                  <label for="venueImg">Gambar venue</label>
                  <input type="file" id="venueImg" class="form-control" @change="uploadImg" />
                  <small v-for="err in errors.data" class="text-danger fs-italic m-0">
                     {{ err.path == "image" ? err.msg + " - " : "" }}
                  </small>
               </div>
               <div class="mb-3">
                  <div class="d-flex column-gap-3 mb-3">
                     <div class="w-100">
                        <label for="chooseProvinsi">Pilih Provinsi</label>
                        <select ref="pilihProvinsi" id="chooseProvinsi" class="form-select" v-model="provinsi">
                           <option selected>Pilih Provinsi</option>
                           <option v-for="{ name } in dataProvinsi" :value="name">{{ name }}</option>
                        </select>
                        <small v-for="err in errors.data" class="text-danger fs-italic m-0">
                           {{ err.path == "provinsi" ? err.msg + " - " : "" }}
                        </small>
                     </div>
                     <div class="w-100">
                        <label for="chooseCity">Pilih Kota</label>
                        <select ref="pilihKota" id="chooseCity" class="form-select" v-model="city" disabled>
                           <option selected>Pilih Kota</option>
                           <option v-for="{ name } in dataKota" :value="name">{{ name }}</option>
                        </select>
                        <small v-for="err in errors.data" class="text-danger fs-italic m-0">
                           {{ err.path == "city" ? err.msg + " - " : "" }}
                        </small>
                     </div>
                  </div>
               </div>
               <div class="mb-3">
                  <input ref="alamat" type="text" v-model="address" class="form-control" placeholder="Alamat" disabled />
                  <small v-for="err in errors.data" class="text-danger fs-italic m-0">
                     {{ err.path == "address" ? err.msg + " - " : "" }}
                  </small>
               </div>
               <div class="mb-3 d-flex column-gap-3">
                  <div class="w-100">
                     <label for="openTime">Buka</label>
                     <input type="time" id="openTime" v-model="open" class="form-control" />
                     <small v-for="err in errors.data" class="text-danger fs-italic m-0">
                        {{ err.path == "open" ? err.msg + " - " : "" }}
                     </small>
                  </div>
                  <div class="w-100">
                     <label for="closeTime">Tutup</label>
                     <input type="time" id="closeTime" v-model="close" class="form-control" />
                     <small v-for="err in errors.data" class="text-danger fs-italic m-0">
                        {{ err.path == "close" ? err.msg + " - " : "" }}
                     </small>
                  </div>
               </div>
               <div clas="mb-0">
                  <loading-button btn-text="Tambah" :loading="loading" />
               </div>
            </form>
         </div>
      </div>
   </div>
</template>

<script>
import axios from "axios";
import { store } from "../../../../utils/store";
import { apiUrl } from "../../../../config/const";
import LoadingButton from "../../../../components/buttons/LoadingButton.vue";

export default {
   name: "Tambah Venue Modal",
   components: { "loading-button": LoadingButton },
   data() {
      return {
         dataProvinsi: [],
         dataKota: [],
         name: "",
         description: "",
         price: "",
         image: "",
         provinsi: "",
         city: "",
         address: "",
         open: "",
         close: "",
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
         const response = await axios.get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
         this.dataProvinsi = response.data;
      } catch (err) {
         console.error(err);
      }
   },
   watch: {
      async provinsi(newVal) {
         if (newVal !== "Pilih Provinsi") {
            this.$refs.pilihKota.disabled = false;

            const prov = this.dataProvinsi.find((prov) => prov.name === newVal);

            try {
               const response = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${prov.id}.json`);

               this.dataKota = response.data;
            } catch (err) {
               console.log(err);
            }
         } else {
            this.$refs.pilihKota.disabled = true;
         }
      },
      async city(newVal) {
         if (newVal !== "Pilih Kota") {
            this.$refs.alamat.disabled = false;
         } else {
            this.$refs.alamat.disabled = true;
         }
      },
   },
   methods: {
      uploadImg(e) {
         this.image = e.target.files[0];
      },
      async onSubmit() {
         this.loading = !this.loading;

         const formData = {
            name: this.name,
            description: this.description,
            price: this.price,
            provinsi: this.provinsi,
            image: this.image,
            city: this.city,
            address: this.address,
            open: this.open,
            close: this.close,
         };

         try {
            const { data } = await axios.post(apiUrl("venue"), formData);

            const formImg = new FormData();
            formImg.append("venue-img", this.image);

            const response = await axios.patch(apiUrl(`venue/replace-image/${data.payload._id}`), formImg, {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            });

            this.loading = !this.loading;
            store.setVenues(response.data.payload);
            store.setModal();
            store.setAlert(true, 200, "Berhasil Menambahkan Venue Baru");
         } catch (err) {
            this.errors.status = true;
            this.errors.data = err.response.data.errors;
            this.loading = !this.loading;
         }
      },
      closeModal() {
         store.setDetailVenue();
         store.setModal();
      },
   },
};
</script>

<style></style>

import { reactive } from "vue";

export const store = reactive({
   modalName: "",
   modal: false,
   user: {},
   auth: false,
   setAuth() {
      this.auth = !this.auth;
   },
   setUser(data = {}) {
      this.user = data;
   },
   setModal(name = "") {
      if (name === "") {
         this.modalName = name;
         this.modal = false;
      } else {
         this.modalName = name;
         this.modal = true;
      }
   },
});

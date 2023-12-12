import { reactive } from "vue";

export const store = reactive({
   modalName: "",
   modal: false,
   setModal(name = "") {
      if (name === "") {
         this.modalName = name;
         this.modal = false;
      } else {
         this.modalName = name;
         this.modal = true;
      }
   },
   user: {},
   auth: false,
   setUser(data = {}) {
      this.user = data;
   },
   setAuth(bool) {
      this.auth = bool;
   },
   userMenu: {
      menu: ["Booking", "Main Bareng"],
   },
   setUserMenu(name) {
      if (name == "Booking") {
         this.userMenu.currentMenu = name;
         this.userMenu.status = ["Semua Status", "Menunggu Pembayaran", "Berhasil", "Dibatalkan", "Selesai"];
      }
   },
   carts: {},
   setCarts(data = {}) {
      this.carts = data;
   },
   alert: {
      statusCode: 0,
      status: false,
      message: "",
   },
   setAlert(status, code = 0, message = "") {
      this.alert.status = status;
      this.alert.statusCode = code;
      this.alert.message = message;
   },
   booking: {
      data: [],
      detail: {},
   },
   setBooking(data = []) {
      this.booking.data = data;
   },
   setDetailBooking(data = {}) {
      this.booking.detail = data;
   },
});

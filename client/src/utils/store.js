import { reactive } from "vue";

export const store = reactive({
   modalName: "",
   modal: false,
   user: {},
   auth: false,
   userMenu: {
      menu: ["Booking", "Main Bareng"],
   },
   setAuth(bool) {
      this.auth = bool;
   },
   setUser(data = {}) {
      this.user = data;
   },
   setUserMenu(name) {
      if (name == "Booking") {
         this.userMenu.currentMenu = name;
         this.userMenu.status = ["Semua Status", "Menunggu Pembayaran", "Berhasil", "Dibatalkan", "Selesai"];
      }
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
   cart: {
      venue: null,
      schedules: [],
   },
   addCart(venue, data) {
      if (this.cart.venue === null) {
         this.cart.venue = venue;
      } else {
         if (this.cart.venue != venue) {
            this.cart.venue = venue;
            this.cart.schedules = [];
         }
      }
      this.cart.schedules.push(data);
   },
   deleteCart({ fieldName, date, start }) {
      const filter = this.cart.schedules.filter((c) => c.fieldName != fieldName || c.date != date || c.start != start);

      if (filter.length < 1) {
         this.cart.venue = null;
      }

      this.cart.schedules = filter;
   },
});

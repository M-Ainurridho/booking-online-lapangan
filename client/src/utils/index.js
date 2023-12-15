import axios from "axios";
import { apiUrl } from "../config/const";
import { store } from "./store";

export const setTitle = (title) => {
   document.title = title;
};

export const toRupiah = (price) => {
   let cost;
   cost = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
   }).format(price);

   cost = cost.split(",");
   cost.pop();
   return cost.join();
};

export const timeString = (time) => {
   return `${new Date(time).getHours()}:${new Date(time).getMinutes().toString().length > 1 ? new Date(time).getMinutes() : "00"}`;
};

export const dateString = (date) => {
   return new Date(date).toDateString().split(" ");
};

export const exchangeToken = async () => {
   const token = localStorage.getItem("martoken");

   try {
      if (token) {
         axios.defaults.headers.common["auth-token"] = token;

         const response = await axios.post(apiUrl("auth/exchange-token"));

         if (response.data.payload.carts.fields.length > 0) {
            store.setCarts(response.data.payload.carts);
         }

         store.setUser(response.data.payload);
         store.setAuth(true);
         store.setModal();
      } else {
         delete axios.defaults.headers.common["auth-token"];
      }
   } catch (err) {
      console.error(err);
   } finally {
      return;
   }
};

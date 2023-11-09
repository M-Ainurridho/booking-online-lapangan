<template>
   <UserLayout>
      <h1>Hello, {{ store.user.fullname }}</h1>
      <button @click="home">home</button>
      <button @click="logout">Logout</button>
   </UserLayout>
</template>

<script>
import UserLayout from "../../layouts/UserLayout.vue";
import { store } from "../../utils/store";

export default {
   name: "Dashboard",
   components: { UserLayout },
   data() {
      return {
         store,
      };
   },
   methods: {
      home() {
         this.$router.push("/");
      },
      logout() {
         store.setAuth();
         store.setUser();
         this.$router.push("/");
      },
   },
};
</script>

<style></style>

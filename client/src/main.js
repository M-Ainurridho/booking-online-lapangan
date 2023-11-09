import "./assets/css/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import Layout from "./layouts/Layout.vue";
import router from "./router";

const app = createApp(App);
app.component("Layout", Layout);

app.use(router);
app.mount("#app");

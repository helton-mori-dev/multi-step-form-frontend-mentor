import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/reset.css";
import { store } from "./store/store.js";

const app = createApp(App);
app.use(store);
app.mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
// create App
const AppInstance = createApp(App);
// add config.
AppInstance.config.errorHandler = (err) => {
  console.log("AppInstance : ", err);
};
// mount app
AppInstance.mount("#app");

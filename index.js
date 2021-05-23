//import Vue from "vue";
import ButtonSave from "./src/Buttons/ButtonSave.vue";
import ButtonDelete from "./src/Buttons/ButtonDelete.vue";

/*
const HelloWorldSimple = {
  install(Vue) {
    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component("button-save", ButtonSave);
  }
};
// Automatic installation if Vue has been added to the global scope.
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(HelloWorldSimple);
}
/**/

export { ButtonSave, ButtonDelete };
export { default as AjaxBasic } from "./src/Ajax/basic.js";
export { default as AjaxToastBootStrap } from "./src/Toasts/BootStrap.js";

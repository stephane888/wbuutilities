import Vue from "vue";
import ajax from "../Ajax/basic";
import { BVToastPlugin } from "bootstrap-vue";
Vue.use(BVToastPlugin);

const vm = new Vue();
//console.log("Module Vue :  ", vm, "\n $bvToast : ", vm.$bvToast);

const AjaxToastBootStrap = {
  ...ajax,
  //$bvModal: vm.$bvModal,
  $bvToast: vm.$bvToast,
  notification: function (ajaxTitle, variant = "success") {
    this.$bvToast.toast(" ", {
      title: ajaxTitle,
      variant: variant,
      solid: true,
      toaster: "b-toaster-top-right",
    });
  },
  post: function (url, datas, configs, showNotification = true) {
    return new Promise((resolv, reject) => {
      ajax
        .post(url, datas, configs)
        .then((reponse) => {
          if (showNotification) {
            this.notification("success");
          }
          resolv(reponse);
        })
        .catch((error) => {
          //console.log("error : ", error);
          this.notification(this.GetErrorTitle(error), "warning");
          reject(error);
        });
    });
  },
  get: function (url, configs, showNotification = false) {
    return new Promise((resolv, reject) => {
      ajax
        .post(url, configs)
        .then((reponse) => {
          if (showNotification) {
            this.notification("success");
          }
          resolv(reponse);
        })
        .catch((error) => {
          //console.log("error : ", error);
          this.notification(this.GetErrorTitle(error), "warning");
          reject(error);
        });
    });
  },
  GetErrorTitle: function (error) {
    var title;
    //
    if (error.code) {
      switch (error.code) {
        case "ECONNABORTED":
          var temps = this.axiosInstance.defaults.timeout / 1000 + "s";
          title =
            "Impossible de joindre l'hote distant, temps impartie epuisé. (" +
            temps +
            ")";
          break;
        default:
          title = "Une erreur s'est produite";
      }
    } //
    else if (error.error && error.error.statusText) {
      title = decodeURI(error.error.statusText);
    }
    return title;
  },
};
/**
 * Intercept la reponse ajax pour declenche le toast adapter.
 */
/*
 pas adapter pour gerer les messages d'erreurs.
(function() {
  AjaxToastBootStrap.axiosInstance.interceptors.response.use(
    function(response) {
      console.log("interceptor success");
      AjaxToastBootStrap.notification("success");
      return response;
    },
    function(error) {
      console.log("interceptor error");
      AjaxToastBootStrap.notification("Error", "warning");
      return error;
    }
  );
})();
/**/
export default AjaxToastBootStrap;

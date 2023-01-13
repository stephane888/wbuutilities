import Vue from "vue";
import ajax from "../Ajax/basic";
import { BVToastPlugin, ModalPlugin } from "bootstrap-vue";
Vue.use(BVToastPlugin);
Vue.use(ModalPlugin);
const vm = new Vue();
const AjaxToastBootStrap = {
  ...ajax,
  $bvToast: vm.$bvToast,
  $bvModal: vm.$bvModal,
  modalMessage(body, conf) {
    const confDefault = {
      size: "md",
      buttonSize: "sm",
      hideFooter: true,
      centered: true,
    };
    for (const i in conf) {
      confDefault[i] = conf[i];
    }
    return new Promise((resolv, reject) => {
      this.$bvModal
        .msgBoxConfirm(body, confDefault)
        .then((value) => {
          if (value) resolv(value);
          else reject(value);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  modalConfirmDelete(
    body = "Confirmer la suppression, NB : cette action est irreverssible.",
    conf = {
      title: "Attention",
      okVariant: "danger",
      okTitle: "Supprimer",
      cancelTitle: "Annuler",
      footerClass: "p-2",
    }
  ) {
    return this.modalMessage(body, conf);
  },
  modalSuccess(body = "", conf = {}) {
    const confDefault = {
      title: "Succes",
      headerBgVariant: "success",
      bodyClass: ["p-3"],
      hideFooter: true,
      headerTextVariant: "light",
    };
    for (const i in conf) {
      confDefault[i] = conf[i];
    }
    return this.modalMessage(body, confDefault);
  },
  notification: function(ajaxTitle, variant = "success") {
    this.$bvToast.toast(" ", {
      title: ajaxTitle,
      variant: variant,
      solid: true,
      toaster: "b-toaster-top-right",
    });
  },
  bPost: function(url, datas, configs, showNotification = false) {
    return new Promise((resolv, reject) => {
      this.post(url, datas, configs)
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
  bGet(url, configs, showNotification = false) {
    return new Promise((resolv, reject) => {
      this.get(url, configs)
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
  GetErrorTitle: function(error) {
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

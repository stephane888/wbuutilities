/**
 * Permet d'effectuer les requetes
 * pour modifier ou definir les paramettres par defaut de l'instance, {AjaxBasic}.axiosInstance.defaults.timeout = 30000;
 */
import axios from "axios";
const InstAxios = axios.create({
  timeout: 5000,
});

const basicRequest = {
  axiosInstance: InstAxios,
  post: function (url, datas, configs) {
    return new Promise((resolv, reject) => {
      InstAxios.post(url, datas, configs)
        .then((reponse) => {
          resolv({ status: true, data: reponse.data, reponse: reponse });
        })
        .catch((error) => {
          reject({
            status: false,
            error: error.response,
            code: error.code,
            stack: error.stack,
          });
        });
    });
  },
  get: function (url, configs) {
    return new Promise((resolv, reject) => {
      InstAxios.get(url, configs)
        .then((reponse) => {
          resolv({ status: true, data: reponse.data, reponse: reponse });
        })
        .catch((error) => {
          reject({
            status: false,
            error: error.response,
            code: error.code,
            stack: error.stack,
          });
        });
    });
  },
};

export default basicRequest;

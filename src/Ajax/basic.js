/**
 * Permet d'effectuer les requetes
 * pour modifier ou definir les paramettres par defaut de l'instance, {AjaxBasic}.axiosInstance.defaults.timeout = 30000;
 */
import axios from "axios";
const InstAxios = axios.create({
  timeout: 300000,
});

var formatBasicAuth = function(userName, password) {
  var basicAuthCredential = userName + ":" + password;
  var bace64 = btoa(basicAuthCredential);
  return "Basic " + bace64;
};
var user = JSON.parse(window.localStorage.getItem("user"));
var current_user;
// if (!user) {
//   user = {
//     username: "",
//     password: ""
//   };
// }

if (window.localStorage.getItem("current_user")) {
  current_user = JSON.parse(window.localStorage.getItem("current_user"));
} else {
  current_user = null;
}

const basicRequest = {
  /* Permet de lire la variable user dans le localstorage et de formater l'authorisation */
  auth: user ? formatBasicAuth(user.username, user.password) : null,
  current_user: current_user,
  axiosInstance: InstAxios,
  /**
   * Domaine permettant d'effectuer les tests en local.
   * C'est sur ce domaine que les requetes vont etre transmise quand on est en local.
   * @public
   */
  TestDomain: null,
  /**
   * Permet de specifier un domaine pour la production. ( utiliser uniquement quand l'application front est sur un domaine different de l'application serveur ).
   */
  baseUrl: null,
  /**
   * Permet de determiner, si nous sommes en local ou pas.
   * @public
   * @returns Booleans
   */
  isLocalDev:
    window.location.host.includes("localhost") ||
    window.location.host.includes(".kksa")
      ? true
      : false,
  /**
   * Permet de derminer la source du domaine, en function des paramettres definit.
   * @private (ne doit pas etre surcharger).
   * @returns String
   */
  getBaseUrl() {
    if (this.baseUrl)
      return this.isLocalDev && this.TestDomain
        ? this.TestDomain.trim("/")
        : this.baseUrl;
    else
      return this.isLocalDev && this.TestDomain
        ? this.TestDomain.trim("/")
        : window.location.protocol + "//" + window.location.host;
  },
  post: function(url, datas, configs) {
    return new Promise((resolv, reject) => {
      const urlFinal = url.includes("://") ? url : this.getBaseUrl() + url;
      InstAxios.post(urlFinal, datas, configs)
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
  delete: function(url, datas, configs) {
    return new Promise((resolv, reject) => {
      const urlFinal = url.includes("://") ? url : this.getBaseUrl() + url;
      console.log("config", datas, configs);
      InstAxios.delete(urlFinal, configs, datas)
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
  get: function(url, configs) {
    return new Promise((resolv, reject) => {
      const urlFinal = url.includes("://") ? url : this.getBaseUrl() + url;
      InstAxios.get(urlFinal, configs)
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
  /**
   * @param file " fichier ?? uploaded"
   */
  postFile(url, file, id = null) {
    return new Promise((resolv, reject) => {
      this.getBase64(file).then((fileEncode) => {
        var headers = new Headers();
        console.log("headers : ", headers);
        var fileCompose = file.name.split(".");
        var myInit = {
          method: "POST",
          headers: headers,
          //mode: "cors",
          body: JSON.stringify({
            upload: fileEncode.base64,
            filename: fileCompose[0],
            ext: fileCompose[1],
            id: id,
          }),
          cache: "default",
        };
        const urlFinal = url.includes("://") ? url : this.getBaseUrl() + url;
        fetch(urlFinal, myInit).then(function(response) {
          response
            .json()
            .then(function(json) {
              resolv(json);
            })
            .catch((error) => {
              reject(error);
            });
        });
      });
    });
  },
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      //reader.onload = () => resolve(reader.result);
      reader.onloadend = () => {
        var fileArray = reader.result.split(",");
        resolve({ src: reader.result, base64: fileArray[1] });
      };
      reader.onerror = (error) => reject(error);
    });
  },
};

export default basicRequest;

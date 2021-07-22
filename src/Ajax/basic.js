/**
 * Permet d'effectuer les requetes
 * pour modifier ou definir les paramettres par defaut de l'instance, {AjaxBasic}.axiosInstance.defaults.timeout = 30000;
 */
import axios from "axios";
const InstAxios = axios.create({
  timeout: 300000,
});

const basicRequest = {
  axiosInstance: InstAxios,
  post: function(url, datas, configs) {
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
  get: function(url, configs) {
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
  /**
   * @param file " fichier à uploaded"
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
        fetch(url, myInit).then(function(response) {
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

/**
 * Permet de recuperer les données via le module drupal json api.
 */
import ajax from "../Ajax/basic";
import entityFormat from "./entityFormat";

class entityLoad extends entityFormat {
  constructor(entityType, bundle) {
    /**
     * Le mot clé 'super' est utilisé afin d'appeler ou d'accéder à des fonctions définies sur l'objet parent
     */
    super();
    /**
     * Le type d'entite au niveau de Drupal, example ( node, taxonomy_term, block_content ... )
     */
    this.entityType = entityType;

    /**
     * Bundle pour le type d'ente this.entityType
     */
    this.bundle = bundle;

    /**
     * Permettra de surcharger ajax avec la configuration de l'App.
     */
    this.ajax = ajax;
    /**
     * Données brutes provenanat de drupal.
     */
    this.rawDatas = [];
  }

  /**
   * Charge les données.
   */
  load() {
    return new Promise((resolv, reject) => {
      this.ajax
        .get(super.buildLink(this.entityType, this.bundle))
        .then((res) => {
          if (res.data && res.data.data) {
            this.rawDatas = res.data.data;
            resolv(this.rawDatas);
          } else throw "Format de données non valide";
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  }

  /**
   * Permet de formater les données poour utilisation bien plus facile.
   */
  formatData() {
    //
  }
}
export default entityLoad;

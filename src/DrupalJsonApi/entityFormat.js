const baseUrl = "/jsonapi";
export default class entityFormat {
  buildLink(entityType, bundle) {
    return baseUrl + "/" + entityType + "/" + bundle;
  }
  valid() {
    return true;
  }
  static get baseUrl() {
    return baseUrl;
  }
}

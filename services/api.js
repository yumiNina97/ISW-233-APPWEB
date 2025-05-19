export const API = {
  url: "http://localhost/",
  postRequest() {},
};

class API {
  constructor(url, headers) {
    this.url = url;
    this.header = headers;
  }
  get(asda) {}
}

const config = {};
export const api = API(url, config);

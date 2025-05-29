export const API = {
  url: "http://localhost/",
  postRequest() {},
};

class API_Class {
  constructor(url, headers) {
    this.url = url;
    this.header = headers;
  }
  get(asda) {}
}

const config = {};
export const api = new API_Class(API.url, config); 

const axios = require('axios')
/*

TODO:

get api host from config  - switch on NODE_ENV for dev, test, prod

*/

// TODO: apiUrl should come from config..
class Base {
  constructor(restPath, name) {
    this.name     = name
    this.axios    = axios
    this.apiUrl   = "http://localhost:4000/api/rest" // TODO import from config..
    this.restPath = restPath
    this.restUrl  = this.apiUrl + restPath
    this.version  = 1
    this.errors   = []

    this.offset   = 0
    this.limit    = 20
    this.meta     = 0

    this.model = {}
    this.models = []
  }

  singular() { return this.name.slice(0, -1) }

  // REST API
  request(meth, params = null, version = null, cb) {
    const method = meth.toUpperCase()

    const url = params.url
    const access_token = params.access_token
    this.errors = [];


    if (method == 'GET') { // add parameters to url
      var string = ''
      for (let key in params) { string += key + "=" + String(params) + "&" }
      if (string != '') { params.url += "?" + string }
      params = {}
    }

    var headers = {
      version: version,
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json'
    }

    if (access_token) { headers.access_token = access_token; }

    delete(params.url);
    delete(params.access_token);

    var response = null;

    var self = this;

    this.axios({
      method: method,
      url: url,
      data: params,
      headers: headers
    })
    .then((data) => {

      if (data.error) {
        self.errors.push(data.error);
      } else if (data.errors) {
        self.errors = data.errors;
      } else {
        response = data;
      }

    }).catch(function (error) {
      self.errors.push(error);
    })
    .then(function () {
      cb(self.errors, response);
    });
    /*
    req.end( (res) => {
      cb(res);
    });
    */
  };

  get(params, cb) {
    params.url  = this.restUrl;
    this.models = []

    if (params.id) {
      params.url = params.url + '/' + String(params.id)
    }

    // handle paging
    if (!params.offset) { params.offset = 0;  }
    if (!params.limit)  { params.limit  = 20; }
    this.request('GET', params, this.version, (err, response) => {
      if (response.data) {
        this.meta = response.data.meta
        this.models = response.data[this.name]
      }
      cb(err, response);
    });
  };

  show(params, cb) {
    params.url = this.restUrl;
    this.model = {};
    if (params.id) {
      params.url = params.url + '/' + String(params.id)
    }
    delete(params.id);
    var self = this;
    this.request('GET', params, this.version, (err, response) => {
      self.setModelFromResponse(response)
      // if (response) {
      //   if (response.data) {
      //     if (response.data[self.singular()]) {
      //       self.setModel(response.data[self.singular()])
      //     }
      //   }
      // }
      cb(err, response);
    });

    this.errors = [];
  };

  create(params, cb) {
    this.errors = [];
    params.url = this.restUrl;
    this.request('POST', params, this.version, (err, response) => {
      cb(err, response);
    });
  };

  update(params, cb) {
    this.errors = [];
    params = this.params(params)
    params.url = this.restUrl;
    params.url = params.url.concat('/').concat(this.model.id)

    delete(params.id);

    var self = this;
    this.request('PUT', params, this.version, (err, response) => {
      self.setModelFromResponse(response)
      cb(err, response);
    });
  };

  delete(id, cb) {
    this.errors = [];
    const params = {}
    params.url = this.restUrl;
    params.url  = "/" + this.restUrl + "/" + params.id + "/";
    this.request('DELETE', params, this.version, (err, response) => {
      cb(err, response);
    });
  };

  // validation

  hasError() { return this.errors.length != 0; }

  validate() {  // customize in child class
    return true;
  }

  setModelFromResponse(response) {
    if (response) {
      if (response.data) {
        if (response.data[this.singular()]) {
          this.setModel(response.data[this.singular()])
        }
      }
    }

  }

  // overwrite in child models
  setModel(data) {}

  params(params) {
    if (params === null || params === undefined) {
      params = {}
    }
    params[this.singular()] = this.model
    return params
  }

}

module.exports = Base;

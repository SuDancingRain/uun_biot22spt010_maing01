"use strict";
const DataAbl = require("../../abl/data-abl.js");

class DataController {

  get(ucEnv) {
    return DataAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  view(ucEnv) {
    return DataAbl.view(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new DataController();

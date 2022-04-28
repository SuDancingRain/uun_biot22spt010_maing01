"use strict";
const IotProjectAbl = require("../../abl/iot-project-abl.js");

class IotProjectController {
  init(ucEnv) {
    return IotProjectAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new IotProjectController();

"use strict";

const IotProjectUseCaseError = require("./iot-project-use-case-error.js");
const DATA_ERROR_PREFIX = `${IotProjectUseCaseError.ERROR_PREFIX}data/`;

const View = {
  UC_CODE: `${DATA_ERROR_PREFIX}view/`,

  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${View.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Get = {
  UC_CODE: `${DATA_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  DataDoesNotExist: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}dataDoesNotExist`;
      this.message = "Data does not exist.";
    }
  },
};

module.exports = {
  Get,
  View
};

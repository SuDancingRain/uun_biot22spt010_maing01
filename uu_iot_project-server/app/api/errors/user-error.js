"use strict";

const IotProjectUseCaseError = require("./iot-project-use-case-error.js");
const USER_ERROR_PREFIX = `${IotProjectUseCaseError.ERROR_PREFIX}user/`;

const Create = {
  UC_CODE: `${USER_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UserAlreadyExists: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}userAlreadyExists`;
      this.message = "User already exists.";
    }
  },
  UserDaoCreateFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}userDaoCreateFailed`;
      this.message = "Failed to create User.";
    }
  },
};

const Delete = {
  UC_CODE: `${USER_ERROR_PREFIX}delete/`,

  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UserDoesNotExist: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}userDoesNotExist`;
      this.message = "User does not exist.";
    }
  },
  UserDaoDeleteFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}userDaoDeleteFailed`;
      this.message = "Failed to delete User.";
    }
  },
};

const List = {
  UC_CODE: `${USER_ERROR_PREFIX}list/`,

  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Get = {
  UC_CODE: `${USER_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UserDoesNotExist: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}userDoesNotExist`;
      this.message = "User does not exist.";
    }
  },
};

const Update = {
  UC_CODE: `${USER_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UserDoesNotExist: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userDoesNotExist`;
      this.message = "User does not exist.";
    }
  },
  UserAlreadyExists: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userAlreadyExists`;
      this.message = "User already exists.";
    }
  },
  UserDaoUpdateFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userDaoUpdateFailed`;
      this.message = "Failed to update User.";
    }
  },
};

module.exports = {
  Update,
  Get,
  List,
  Delete,
  Create
};
